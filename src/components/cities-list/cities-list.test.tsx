import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CitiesList from './cities-list';

describe('CitiesList', () => {
  it('should render cities and highlight active city', () => {
    render(
      <CitiesList
        cities={['Paris', 'Amsterdam']}
        activeCity="Paris"
        onCityClick={vi.fn()}
      />,
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Paris').closest('a')).toHaveClass('tabs__item--active');
  });
});
