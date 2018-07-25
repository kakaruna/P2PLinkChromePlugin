import { connect } from "react-redux";
import Footer from "../components/footer";
import { State } from "../reducers";
import { stat } from "fs";

const mapStateToProps = (state: State) => {
    return {
        filter: state.links.filter
    };
};

export default connect(mapStateToProps)(Footer);
