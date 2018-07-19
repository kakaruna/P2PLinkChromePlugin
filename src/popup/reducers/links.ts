import { ActionTypes, Action } from "../actions/links";
import { Link } from "../models/link"

// Define our State interface for the current reducer
export interface State {
    ed2k: Array<Link>;
    magnet: Array<Link>;
    isFetching: boolean;
}

// Define our initialState
export const initialState: State = {
    ed2k: [],
    magnet: [],
    isFetching: false
};

/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.REQUEST_RESULTS: {
            return {
                ...state,
                isFetching: true
            };
        }

        case ActionTypes.RECEIVE_RESULTS: {
            return {
                ...state,
                ed2k: action.payload.ed2k,
                magnet: action.payload.magnet,
                isFetching: false
            };
        }

        default:
            return state;
    }
}
