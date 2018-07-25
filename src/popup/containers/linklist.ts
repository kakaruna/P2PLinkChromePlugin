import { connect } from "react-redux";
import LinkList from "../components/linklist";
import { State } from "../reducers";

const mapStateToProps = (state: State) => {
    return { 
        ed2k: state.links.ed2k, 
        magnet: state.links.magnet, 
        isFetching: state.links.isFetching,
        tabIndex: state.tabs.tabIndex
     };
};

export default connect(mapStateToProps)(LinkList);
