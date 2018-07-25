import { ActionTypes, Action } from "../actions/tabs";

export interface State {
    tabIndex: number;
}

// Define our initialState
export const initialState: State = {
    tabIndex: 0
};

/* 
 * Reducer takes 2 arguments
 * state: The state of the reducer. By default initialState ( if there was no state provided)
 * action: Action to be handled. Since we are in todos reducer, action type is Action defined in our actions/todos file.
 */
export function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.SELECT_TAB: {
            return {
                ...state,
                tabIndex: action.payload.tabIndex
            };
        }

        default:
            return state;
    }
}
