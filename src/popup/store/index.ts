// import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { reducers, State } from "../reducers";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import sagaMonitor from "../sagamonitor";
import { Action } from "../actions/links";

export default () => {
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    return {
        ...createStore<State, Action, {}, {}>(reducers, applyMiddleware(sagaMiddleware, logger)),
        runSaga: sagaMiddleware.run
    };
}
