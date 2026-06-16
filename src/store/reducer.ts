import { AuthorizationStatus } from '../const';
import { OfferType } from '../types/offer';
import { UserType } from '../types/user';
import { Action, ActionType } from './action';

export type State = {
  city: string;
  offers: OfferType[];
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserType | null;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.FillOffers:
      return { ...state, offers: action.payload };
    case ActionType.SetOffersDataLoading:
      return { ...state, isOffersDataLoading: action.payload };
    case ActionType.SetAuthorizationStatus:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.SetUser:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default reducer;
