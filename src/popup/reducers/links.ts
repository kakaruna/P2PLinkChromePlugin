import { ActionTypes, Action } from "../actions/links";
import { Link } from "../models/link";
import { stat } from "fs";

// Define our State interface for the current reducer
export interface State {
    filter: string;
    ed2k: Array<Link>;
    magnet: Array<Link>;
    isFetching: boolean;
}

// Define our initialState
export const initialState: State = {
    filter: "",
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

        case ActionTypes.CHECK_ALL: {
            let s = Object.assign([], state[action.payload.type]);
            s.map(l => {
                l.checked = action.payload.checked;
            });
            state[action.payload.type] = s;

            return {
                ...state,
                ed2k: state.ed2k,
                magnet: state.magnet
            };
        }

        case ActionTypes.CHECK_ONE: {
            let s = Object.assign([], state[action.payload.type]);
            let l = s.find(l => l.id === action.payload.index);
            if (l !== null) {
                l.checked = action.payload.checked;
            }
            state[action.payload.type] = s;

            return {
                ...state,
                ed2k: state.ed2k,
                magnet: state.magnet
            };
        }

        case ActionTypes.CHECK_OPPOSITE: {
            let s = Object.assign([], state[action.payload.type]);
            s.map(l => {
                l.checked = !l.checked;
            });
            state[action.payload.type] = s;

            return {
                ...state,
                ed2k: state.ed2k,
                magnet: state.magnet
            };
        }

        case ActionTypes.FILTER_CHANGE: {
            return {
                ...state,
                filter: action.payload.filter
            };
        }

        case ActionTypes.FILTER_RESULTS: {
            return {
                ...state,
                ed2k: action.payload.ed2k,
                magnet: action.payload.magnet
            };
        }

        default:
            return state;
    }
}
