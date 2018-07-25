import { put, call, fork, select, take, takeLatest, all, delay, cancel } from "redux-saga/effects";
import { requestResult, receivetResult, filterResultAction, ActionTypes as actions } from "../actions/links";
import { Results } from "../../shared";
import { getLinksState } from "../selectors/links";
import { Links, Link } from "../models/link";
import { selectTab } from "../actions/tabs";

export function getResultsApi() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { ask: "getResult" }, response => {
                resolve(response.result);
            });
        });
    });

    // return new Promise((resolve, reject) => {
    //     resolve({
    //         ed2k_result: [],
    //         magnet_result: ["aaa"]
    //     });
    // });
}

export function refreshResultsApi() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { ask: "refreshResult" }, response => {
                resolve(response.result);
            });
        });
    });
}

export function toed2kLink(r: Array<string>): Array<Link> {
    let links = new Array<Link>();
    const ed2kRegex = /ed2k:\/\/\|file\|(.+?)\|(.+?)\|.+?\//gi;
    r.map((l, i) => {
        let tmp = ed2kRegex.exec(l);

        if (!tmp) {
            return;
        }

        links.push({
            id: i + 1,
            name: decodeURI(tmp[1]),
            size: (parseFloat(tmp[2]) / (1024 * 1024)).toFixed(2),
            link: l,
            checked: false,
            showable: true
        });
    });

    return links;
}

export function tomagnetLink(r: Array<string>): Array<Link> {
    const name_regex = /dn=(.+?)&/;
    const size_regex = /xl=(.+?)&/;

    let links = new Array<Link>();
    var index = 1;
    r.map((l, i) => {
        let name = name_regex.exec(l);
        let size = size_regex.exec(l);

        if (links.findIndex(i => i.link === l) > -1) {
            return false;
        }

        links.push({
            id: index,
            name: name ? decodeURI(name[1]) : l,
            size: size ? size[1] : "0",
            link: l,
            checked: false,
            showable: true
        });

        index++;
    });

    return links;
}

export function* getResults() {
    yield put(requestResult());
    const r: Results = yield call(getResultsApi);
    const l: Links = { ed2k: toed2kLink(r.ed2k_result), magnet: tomagnetLink(r.magnet_result) };
    yield put(receivetResult(l));
    var index = l.magnet.length > 0 && l.ed2k.length === 0 ? 1 : 0;
    yield put(selectTab(index));
}

export function* refreshResults() {
    yield put(requestResult());
    const r: Results = yield call(refreshResultsApi);
    const l: Links = { ed2k: toed2kLink(r.ed2k_result), magnet: tomagnetLink(r.magnet_result) };
    yield put(receivetResult(l));
}

var filterTask: any;
export function* delayFilter() {
    if (filterTask) cancel(filterTask);
    yield delay(500)
    filterTask = yield fork(filterResult);
}

export function* filterResult() {
    const state = yield select(getLinksState);

    let { ed2k, magnet, filter } = state;
    ed2k = Object.assign([], ed2k);
    magnet = Object.assign([], magnet);

    ed2k.map(l => {
        l.showable = true;

        if (l.name.indexOf(filter) < 0) {
            l.showable = false;
        }
    });

    magnet.map(l => {
        l.showable = true;

        if (l.name.indexOf(filter) < 0) {
            l.showable = false;
        }
    });

    yield put(filterResultAction({ ed2k: ed2k, magnet: magnet }));
}

export function* startup() {
    const getLinks = yield select(getLinksState);
    yield fork(getResults, getLinks);
}

export function* watchRefreshResult() {
    yield takeLatest(actions.REFRESH_RESULTS, refreshResults);
}

export function* watchFilterChange() {
    yield takeLatest(actions.FILTER_CHANGE, delayFilter);
}

export default function* root() {
    // yield fork(startup);
    // yield fork(refreshResults);
    // yield takeEvery(refreshResult, refreshResults);
    // yield takeLatest(refreshResult, refreshResults);

    // yield all([startup(), watchRefreshResult(), watchFilterChangeAsync()]);
    yield fork(startup);
    yield fork(watchRefreshResult);
    yield fork(watchFilterChange);
}
