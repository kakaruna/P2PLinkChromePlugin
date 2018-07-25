import * as React from "react";
import { Dispatch } from "redux";
import Button from "@material-ui/core/Button";

import { Link } from "../models/link";
import { refreshResult, checkAllAction, checkOppositeAction } from "../actions/links";
import "./header.scss";

interface HeaderProps {
    ed2k?: Array<Link>;
    magnet?: Array<Link>;
    tabIndex?: number;
    dispatch?: Dispatch;
}
interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
    get type() {
        return this.props.tabIndex === 0 ? "ed2k" : "magnet";
    }

    get copyLinks() {
        let v = this.props[this.type].filter(l => l.checked === true && l.showable === true);

        let copyLinks = "";
        v.map(l => {
            copyLinks += l.link + "\r\n";
        });
        return copyLinks;
    }

    selectAll() {
        this.props.dispatch(checkAllAction(this.type, true));
    }

    selectOpposite() {
        this.props.dispatch(checkOppositeAction(this.type));
    }

    clear() {
        this.props.dispatch(checkAllAction(this.type, false));
    }

    copy() {
        let copyarea: HTMLTextAreaElement = this.refs.copyarea as HTMLTextAreaElement;
        copyarea.value = this.copyLinks;
        copyarea.select();
        document.execCommand("Copy");
    }

    refresh() {
        this.props.dispatch(refreshResult());
    }

    export115() {
        chrome.runtime.sendMessage(
            { 
                ask: "openTab", 
                url: "http://115.com/?tab=offline&mode=wangpan",
                links: this.copyLinks
            }, response => {
                
            });
    }

    render() {
        return (
            <div className="header">
                <Button variant="contained" size="small" color="primary" onClick={() => this.selectAll()}>
                    {chrome.i18n.getMessage("button_selectall")}
                </Button>
                <Button variant="contained" size="small" color="primary" onClick={() => this.selectOpposite()}>
                    反选
                </Button>
                <Button variant="contained" size="small" color="primary" onClick={() => this.clear()}>
                    清除
                </Button>
                <Button variant="contained" size="small" color="primary" onClick={() => this.copy()}>
                    复制
                </Button>
                <Button variant="contained" size="small" color="primary" onClick={() => this.refresh()}>
                    刷新
                </Button>
                <Button variant="contained" size="small" color="primary" onClick={() => this.export115()}>
                    导出到115
                </Button>
                <textarea ref="copyarea" />
            </div>
        );
    }
}

export default Header;
