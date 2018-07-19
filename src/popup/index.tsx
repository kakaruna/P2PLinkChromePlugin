import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/app";
// import registerServiceWorker from './registerServiceWorker'
import { Provider } from "react-redux";
import configureStore from "./store";
import rootSaga from "./sagas";

import "./index.scss";

const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root") as HTMLElement
);
// registerServiceWorker()
