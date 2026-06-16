import { mockOffer, mockOffers } from '../../mocks/mock-data';
import {
  fillOffers,
  setOffersDataLoading,
  updateOffer,
} from '../action';
import { initialOffersState, offersReducer } from './offers-reducer';

describe('offersReducer', () => {
  it('should return initial state with default action', () => {
    const result = offersReducer(undefined, { type: 'UNKNOWN' });

    expect(result).toEqual(initialOffersState);
  });

  it('should fill offers', () => {
    const result = offersReducer(initialOffersState, fillOffers(mockOffers));

    expect(result.offers).toEqual(mockOffers);
  });

  it('should set offers data loading status', () => {
    const result = offersReducer(initialOffersState, setOffersDataLoading(true));

    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should update offer favorite status', () => {
    const state = offersReducer(initialOffersState, fillOffers(mockOffers));
    const result = offersReducer(
      state,
      updateOffer({ ...mockOffer, isFavorite: true }),
    );

    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.offers[1].isFavorite).toBe(true);
  });
});
