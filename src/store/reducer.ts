import { AuthorizationStatus } from '../const';
import { OfferType } from '../types/offer';
import { ReviewType } from '../types/review';
import { UserType } from '../types/user';
import { Action, ActionType } from './action';

export type State = {
  city: string;
  offers: OfferType[];
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserType | null;
  currentOffer: OfferType | null;
  nearbyOffers: OfferType[];
  reviews: ReviewType[];
  isOfferDataLoading: boolean;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  isOfferDataLoading: false,
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
    case ActionType.SetCurrentOffer:
      return { ...state, currentOffer: action.payload };
    case ActionType.SetNearbyOffers:
      return { ...state, nearbyOffers: action.payload };
    case ActionType.SetReviews:
      return { ...state, reviews: action.payload };
    case ActionType.SetOfferDataLoading:
      return { ...state, isOfferDataLoading: action.payload };
    case ActionType.ResetOfferData:
      return {
        ...state,
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
      };
    default:
      return state;
  }
}

export default reducer;
