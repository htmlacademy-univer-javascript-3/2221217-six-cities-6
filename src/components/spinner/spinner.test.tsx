import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from './spinner';

describe('Spinner', () => {
  it('should render spinner container', () => {
    const { container } = render(<Spinner />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
