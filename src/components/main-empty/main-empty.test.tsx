import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainEmpty from './main-empty';

describe('MainEmpty', () => {
  it('should render empty state message', () => {
    render(<MainEmpty city="Paris" />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Paris')).toBeInTheDocument();
  });
});
