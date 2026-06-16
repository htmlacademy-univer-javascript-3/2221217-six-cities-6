import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockOffer } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import OfferCard from './offer-card';

describe('OfferCard', () => {
  it('should render offer card information', () => {
    render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <OfferCard {...mockOffer} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
  });
});
