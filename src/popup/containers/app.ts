import { connect } from "react-redux";
import App from "../components/app";
import { State } from "../reducers";

const mapStateToProps = (state: State) => state.links;

export default connect(mapStateToProps)(App);
