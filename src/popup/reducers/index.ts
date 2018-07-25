import { combineReducers } from "redux";
import * as fromLinks from "./links";
import * as fromTabs from "./tabs";

export interface State {
    links: fromLinks.State;
    tabs: fromTabs.State;
}

export const initialState: State = {
    links: fromLinks.initialState,
    tabs: fromTabs.initialState
};

export const reducers = combineReducers<State>({
    links: fromLinks.reducer,
    tabs: fromTabs.reducer
});
