import { Action, ActionType } from '../action';

export type AppProcess = {
  city: string;
};

export const initialAppState: AppProcess = {
  city: 'Paris',
};

export function appReducer(state: AppProcess = initialAppState, action: Action): AppProcess {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    default:
      return state;
  }
}
