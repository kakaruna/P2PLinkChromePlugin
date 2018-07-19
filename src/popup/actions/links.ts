import { Results } from "../../shared";
import { Links } from "../models/link";

export enum ActionTypes {
    REQUEST_RESULTS = "[results] REQUEST_RESULTS",
    RECEIVE_RESULTS = "[results] RECEIVE_RESULTS",
    REFRESH_RESULTS = "[results] REFRESH_RESULTS"
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

export type Action = RequestResultAction | ReceiveResultAction | RefreshResultAction;
