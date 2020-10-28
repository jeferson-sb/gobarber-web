import React from 'react';
import { render, screen } from '@testing-library/react';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should render component with loading state', () => {
    render(<Button loading>Test</Button>);
    expect(screen.getByRole('button').textContent).toBe('Loading...');
  });
});
