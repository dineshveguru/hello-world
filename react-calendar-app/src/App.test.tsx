import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Calendar component', () => {
  render(<App />);
  // Check if an element with the class 'calendar-container' is present.
  // This class is the root of the Calendar component.
  const calendarContainerElement = screen.getByTestId('calendar-container'); // This will require adding data-testid to Calendar.js
  // As an alternative, if we don't want to add data-testid, we can look for a known child.
  // For example, the month/year display:
  // const monthYearDisplay = screen.getByRole('heading', { level: 2 });
  // expect(monthYearDisplay).toBeInTheDocument();

  // Let's try to find the container by a class name.
  // Note: getByClassName is not a standard query. We'd use querySelector with a class.
  // However, the simplest is often to check for a known, visible child element.
  // The "Previous" button is a good candidate.
  expect(screen.getByText('Previous')).toBeInTheDocument();
  // And the "Next" button
  expect(screen.getByText('Next')).toBeInTheDocument();
  // And the month/year heading
  expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
});
