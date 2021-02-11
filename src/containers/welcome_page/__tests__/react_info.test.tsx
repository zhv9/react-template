import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactInfo from '../react_info';

test('renders learn react link', () => {
  render(<ReactInfo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
