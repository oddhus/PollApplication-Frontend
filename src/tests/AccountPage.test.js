import React from 'react';
import { render } from '@testing-library/react';
import { AccountPage } from '../pages/AccountPage';

test('renders learn react link', () => {
  const { getByText } = render(<AccountPage />);
  const linkElement = getByText(/AccountPage/);
  expect(linkElement).toBeInTheDocument();
});
