import React from 'react';
import { render, screen } from '@testing-library/react';
import { CurrencyCalculator } from './CurrencyCalculator';

test('renders learn react link', () => {
  render(<CurrencyCalculator />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
