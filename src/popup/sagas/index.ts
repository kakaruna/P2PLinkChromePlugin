import { put, call, fork, select, take, takeLatest, delay, all } from "redux-saga/effects";
import { requestResult, receivetResult, refreshResult } from "../actions/links";
import { Results } from "../../shared";
import { getLinksState } from "../selectors/links";
import { Links, Link } from "../models/link";

export function getResultsApi() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { ask: "getResult" }, response => {
                resolve(response.result);
            });
        });
    });
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
            id: i,
            name: decodeURI(tmp[1]),
            size: (parseFloat(tmp[2]) / (1024 * 1024)).toFixed(2),
            link: l,
            selected: false
        });
    });

    return links;
}

export function tomagnetLink(r: Array<string>): Array<Link> {
    const name_regex = /dn=(.+?)&/;
    const size_regex = /xl=(.+?)&/;

    let links = new Array<Link>();
    r.map((l, i) => {
        let name = name_regex.exec(l);
        let size = size_regex.exec(l);

        links.push({
            id: i,
            name: name ? decodeURI(name[1]) : l,
            size: size ? size[1] : "0",
            link: l,
            selected: false
        });
    });

    return links;
}

export function* getResults() {
    yield put(requestResult());
    const r: Results = yield call(getResultsApi);
    const l: Links = { ed2k: toed2kLink(r.ed2k_result), magnet: tomagnetLink(r.magnet_result) };
    yield put(receivetResult(l));
}

export function* refreshResults() {
    yield put(requestResult());
    const r: Results = yield call(refreshResultsApi);
    const l: Links = { ed2k: toed2kLink(r.ed2k_result), magnet: tomagnetLink(r.magnet_result) };
    yield put(receivetResult(l));
}

export function* startup() {
    const getLinks = yield select(getLinksState);
    yield fork(getResults, getLinks);
}

function* watchIncrementAsync() {
    yield takeLatest('INCREMENT_ASYNC', refreshResults);
}

export default function* root() {
    // yield fork(startup);
    // yield fork(refreshResults);
    // yield takeEvery(refreshResult, refreshResults);
    // yield takeLatest(refreshResult, refreshResults);

    yield all([startup(), watchIncrementAsync()]);
}
