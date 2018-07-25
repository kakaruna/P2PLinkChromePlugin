import { connect } from "react-redux";
import Header from "../components/header";
import { State } from "../reducers";

const mapStateToProps = (state: State) => {
    return {
        ed2k: state.links.ed2k,
        magnet: state.links.magnet,
        tabIndex: state.tabs.tabIndex
    };
};

export default connect(mapStateToProps)(Header);
