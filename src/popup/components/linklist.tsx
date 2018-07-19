import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Links from "./Links";
import { Link } from "../models/link";

import "./linklist.scss";

interface LinkListProps {
    ed2k?: Array<Link>;
    magnet?: Array<Link>;
}
interface LinkListState {
    value?: number;
}

export default class LinkList extends React.Component<LinkListProps, LinkListState> {
    constructor(props: LinkListProps) {
        super(props);

        this.state.value = props.magnet.length > 0 && props.ed2k.length === 0 ? 1 : 0;
    }

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { ed2k, magnet } = this.props;

        return (
            <div className="linklist">
                <AppBar position="sticky" color="primary">
                    <Tabs value={this.state.value} onChange={this.handleChange} fullWidth>
                        <Tab label="ed2k结果" />
                        <Tab label="magnet结果" />
                        <Tab label="Item Three" />
                    </Tabs>
                </AppBar>
                <SwipeableViews index={this.state.value} onChangeIndex={this.handleChangeIndex} className="views">
                    <Typography component="div" className="typography">
                        <Links data={ed2k} />
                    </Typography>
                    <Typography component="div" className="typography">
                        <Links data={magnet} />
                    </Typography>
                    <Typography component="div" className="typography">Item Three</Typography>
                </SwipeableViews>
            </div>
        );
    }
}
