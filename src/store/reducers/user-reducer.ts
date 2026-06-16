import { AuthorizationStatus } from '../../const';
import { UserType } from '../../types/user';
import { Action, ActionType } from '../action';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserType | null;
};

export const initialUserState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export function userReducer(state: UserProcess = initialUserState, action: Action): UserProcess {
  switch (action.type) {
    case ActionType.SetAuthorizationStatus:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.SetUser:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
