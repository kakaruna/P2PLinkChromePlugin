export enum ActionTypes {
    SELECT_TAB = "[results] SELECT_TAB",
}

export interface SelectTabAction {
    type: ActionTypes.SELECT_TAB;
    payload: {
        tabIndex: number
    };
}

export function selectTab(index): SelectTabAction {
    return {
        type: ActionTypes.SELECT_TAB,
        payload: {
            tabIndex: index
        }
    };
}

export type Action = SelectTabAction;
