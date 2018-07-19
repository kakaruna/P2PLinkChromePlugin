import * as React from "react";
import { Dispatch } from "redux";
import Button from "@material-ui/core/Button";

import { refreshResult } from "../actions/links";
import "./footer.scss";

interface FooterProps {
    dispatch?: Dispatch;
}
interface FooterState {}

class Footer extends React.Component<FooterProps, FooterState> {
    refreshLinks() {
        this.props.dispatch(refreshResult());
    }

    render() {
        return (
            <div className="footer">
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => {
                        this.refreshLinks();
                    }}
                >
                    Refresh
                </Button>
            </div>
        );
    }
}

export default Footer;
