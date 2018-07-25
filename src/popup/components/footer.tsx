import * as React from "react";
import { Dispatch } from "redux";
import Input from "@material-ui/core/Input";
import { filterChangeAction } from "../actions/links";

import "./footer.scss";

interface FooterProps {
    dispatch?: Dispatch;
    filter?: string;
}
interface FooterState {}

class Footer extends React.Component<FooterProps, FooterState> {
    handleChange(event) {
        const v = event.target.value;
        this.props.dispatch(filterChangeAction(v));
    }

    render() {
        return (
            <div className="footer">
                <Input placeholder="Filter" onChange={e => this.handleChange(e)} value={this.props.filter} />
            </div>
        );
    }
}

export default Footer;
