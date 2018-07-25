import * as React from "react";
import LinkList from "../containers/linklist";

import Header from "../containers/header";
import Footer from "../containers/footer";
import { Link } from "../models/link";

import "./app.scss";

interface AppProps {
}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="content">
                    <LinkList />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
