import * as React from "react";

import "./header.scss";

interface HeaderProps {}
interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
    render() {
        return <div className="header">Header</div>;
    }
}

export default Header;
