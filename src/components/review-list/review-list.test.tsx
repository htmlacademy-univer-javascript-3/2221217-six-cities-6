import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { mockReview } from '../../mocks/mock-data';
import ReviewList from './review-list';

describe('ReviewList', () => {
  it('should render reviews count and list', () => {
    render(<ReviewList reviews={[mockReview]} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });
});
