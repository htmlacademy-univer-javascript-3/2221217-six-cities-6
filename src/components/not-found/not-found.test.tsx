import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from './not-found';

describe('NotFound', () => {
  it('should render 404 page', () => {
    render(<NotFound />);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
