import * as React from "react";
import LinkList from "../components/linklist";

import Header from "./header";
import Footer from "../containers/footer";
import { Link } from "../models/link";

import "./app.scss";

interface AppProps {
    ed2k?: Array<Link>;
    magnet?: Array<Link>;
    isFetching?: boolean;
}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
    render() {
        const { ed2k, magnet, isFetching } = this.props;

        return (
            <div className="app">
                <Header />
                <div className="content">
                    {isFetching && <div>loading</div>}
                    {!isFetching && <LinkList ed2k={ed2k} magnet={magnet} />}
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
