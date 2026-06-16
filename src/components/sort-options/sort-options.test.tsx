import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SortOptions from './sort-options';
import { SortType } from '../../utils/sorting';

describe('SortOptions', () => {
  it('should render active sorting option', () => {
    render(
      <SortOptions
        activeSorting={SortType.Popular}
        onSortingChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByText('Popular')).toHaveLength(2);
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
  });
});
