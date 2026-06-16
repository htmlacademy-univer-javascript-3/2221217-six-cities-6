import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { mockReview } from '../../mocks/mock-data';
import Review from './review';

describe('Review', () => {
  it('should render review information', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText('May 2019')).toBeInTheDocument();
  });
});
