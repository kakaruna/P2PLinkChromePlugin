import { Links } from "../models/link";

export enum ActionTypes {
    REQUEST_RESULTS = "[results] REQUEST_RESULTS",
    RECEIVE_RESULTS = "[results] RECEIVE_RESULTS",
    REFRESH_RESULTS = "[results] REFRESH_RESULTS",
    CHECK_ONE = "[results] CHECK_ONE",
    CHECK_ALL = "[results] CHECK_ALL",
    CHECK_OPPOSITE = "[results] CHECK_OPPOSITE",
    FILTER_CHANGE = "[results] FILTER_CHANGE",
    FILTER_RESULTS = "[results] FILTER_RESULTS",
}

export interface RequestResultAction {
    type: ActionTypes.REQUEST_RESULTS;
    payload: {};
}

export interface ReceiveResultAction {
    type: ActionTypes.RECEIVE_RESULTS;
    payload: Links;
}

export interface RefreshResultAction {
    type: ActionTypes.REFRESH_RESULTS;
    payload: {};
}

export interface CheckOneAction {
    type: ActionTypes.CHECK_ONE;
    payload: {
        type: "ed2k" | "magnet";
        index: number;
        checked: boolean;
    };
}

export interface CheckAllAction {
    type: ActionTypes.CHECK_ALL;
    payload: {
        type: "ed2k" | "magnet";
        checked: boolean;
    };
}

export interface CheckOppositeAction {
    type: ActionTypes.CHECK_OPPOSITE;
    payload: {
        type: "ed2k" | "magnet";
    };
}

export interface FilterChangeAction {
    type: ActionTypes.FILTER_CHANGE;
    payload: {
        filter: string;
    };
}

export interface FilterResultAction {
    type: ActionTypes.FILTER_RESULTS;
    payload: Links;
}

export function requestResult(): RequestResultAction {
    return {
        type: ActionTypes.REQUEST_RESULTS,
        payload: {}
    };
}

export function receivetResult(links: Links): ReceiveResultAction {
    return {
        type: ActionTypes.RECEIVE_RESULTS,
        payload: links
    };
}

export function refreshResult(): RefreshResultAction {
    return {
        type: ActionTypes.REFRESH_RESULTS,
        payload: {}
    };
}

export function checkOneAction(type, index, checked): CheckOneAction {
    return {
        type: ActionTypes.CHECK_ONE,
        payload: {
            type: type,
            index: index,
            checked: checked
        }
    };
}

export function checkAllAction(type, checked): CheckAllAction {
    return {
        type: ActionTypes.CHECK_ALL,
        payload: {
            type: type,
            checked: checked
        }
    };
}

export function checkOppositeAction(type): CheckOppositeAction {
    return {
        type: ActionTypes.CHECK_OPPOSITE,
        payload: {
            type: type
        }
    };
}

export function filterChangeAction(value): FilterChangeAction {
    return {
        type: ActionTypes.FILTER_CHANGE,
        payload: {
            filter: value
        }
    };
}

export function filterResultAction(links: Links): FilterResultAction {
    return {
        type: ActionTypes.FILTER_RESULTS,
        payload: links
    };
}

export type Action = RequestResultAction | ReceiveResultAction | RefreshResultAction 
    | CheckOneAction | CheckAllAction | CheckOppositeAction 
    | FilterChangeAction | FilterResultAction ;
