import * as React from "react";
import { Dispatch } from "redux";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Links from "./links";
import { Link } from "../models/link";
import { selectTab } from "../actions/tabs";

import "./linklist.scss";
import { checkOneAction, checkAllAction } from "../actions/links";

interface LinkListProps {
    ed2k?: Array<Link>;
    magnet?: Array<Link>;
    isFetching?: boolean;
    tabIndex?: number;
    dispatch?: Dispatch;
}
interface LinkListState {
}

export default class LinkList extends React.Component<LinkListProps, LinkListState> {
    constructor(props: LinkListProps) {
        super(props);
    }

    handleChange = (event, value) => {
        this.props.dispatch(selectTab(value));
    };

    handleChangeIndex = index => {
        this.props.dispatch(selectTab(index));
    };

    checkChange(type: string, id: number, checked: boolean){
        if(id){
            this.props.dispatch(checkOneAction(type, id, checked))
        }else{
            this.props.dispatch(checkAllAction(type, checked))
        }
    }

    render() {
        const { isFetching, ed2k, magnet } = this.props;
        return (
            <div className="linklist">
                {isFetching && <div>loading</div>}
                {!isFetching && 
                    <div>
                        <AppBar position="sticky" color="primary">
                            <Tabs value={this.props.tabIndex} onChange={this.handleChange} fullWidth>
                                <Tab label="ed2k结果" />
                                <Tab label="magnet结果" />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews index={this.props.tabIndex} onChangeIndex={this.handleChangeIndex} className="views">
                            <Typography component="div" className="typography">
                                <Links data={ed2k} onCheckChange={(id,checked) => this.checkChange("ed2k", id, checked) } />
                            </Typography>
                            <Typography component="div" className="typography">
                                <Links data={magnet} onCheckChange={(id,checked) => this.checkChange("magnet", id, checked) } />
                            </Typography>
                        </SwipeableViews>
                    </div>  
                }
            </div>
        );
    }
}
