import { h, Component } from "preact";

import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";

export interface AppProps {}

export interface AppState {}

export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        debugger;

        super(props);

        // chrome.extension.getBackgroundPage().result;

        chrome.extension.sendRequest(
            { ask: "getResult" }, 
            (response) => {
                console.log(response.result);
            }
        );

        console.log()
    }

    render(props: AppProps, state: AppState) {
        return (
            <Button ripple raised>
                Flat button with ripple
            </Button>
        );
    }
}
