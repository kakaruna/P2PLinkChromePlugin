import { combineReducers } from "redux";
import * as fromLinks from "./links";

/*
 * This is the root state of the app
 * It contains every substate of the app
 */

export interface State {
    links: fromLinks.State;
}

/*
 * initialState of the app
 */
export const initialState: State = {
    links: fromLinks.initialState
};

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducers = combineReducers<State>({
    links: fromLinks.reducer
});
