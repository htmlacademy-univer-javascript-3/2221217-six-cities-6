import { OfferType } from '../../types/offer';
import { ReviewType } from '../../types/review';
import { Action, ActionType } from '../action';

export type OfferData = {
  currentOffer: OfferType | null;
  nearbyOffers: OfferType[];
  reviews: ReviewType[];
  isOfferDataLoading: boolean;
};

export const initialOfferDataState: OfferData = {
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  isOfferDataLoading: false,
};

export function offerDataReducer(state: OfferData = initialOfferDataState, action: Action): OfferData {
  switch (action.type) {
    case ActionType.SetCurrentOffer:
      return { ...state, currentOffer: action.payload };
    case ActionType.SetNearbyOffers:
      return { ...state, nearbyOffers: action.payload };
    case ActionType.SetReviews:
      return { ...state, reviews: action.payload };
    case ActionType.SetOfferDataLoading:
      return { ...state, isOfferDataLoading: action.payload };
    case ActionType.ResetOfferData:
      return { ...initialOfferDataState };
    default:
      return state;
  }
}
