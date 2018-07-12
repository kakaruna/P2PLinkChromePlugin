import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { State, reducer } from "../reducers";
import { Action } from "../actions/todos";

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const store = createStore<State, Action, {}, {}>(reducer, applyMiddleware(logger));

export default store;
