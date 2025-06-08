import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar Component', () => {
  test('renders with the current month and year', () => {
    render(<Calendar />);
    const currentDate = new Date();
    const monthYearString = currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
    expect(screen.getByText(monthYearString)).toBeInTheDocument();
  });

  test('renders the correct number of days for the current month', () => {
    render(<Calendar />);
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Query for day elements. This assumes day elements render their number.
    // Adjust selector if your day rendering is different (e.g., includes other text or structure)
    const dayElements = screen.getAllByText(/^\d{1,2}$/).filter(el => {
      // Ensure we are only getting elements that are just numbers (days)
      // and are children of the .calendar-day container if possible for more specificity
      return el.classList.contains('calendar-day') || el.closest('.calendar-day');
    });

    // Filter out day numbers that might appear elsewhere (e.g. year if it's 2 digits)
    // This is a bit simplistic; more robust selectors might be needed depending on final HTML structure.
    const actualDayCells = dayElements.filter(el => {
        const dayNumber = parseInt(el.textContent, 10);
        // Make sure the element is a direct child of calendar-grid and also a calendar-day
        const isCalendarDayCell = el.classList.contains('calendar-day') && el.parentElement.classList.contains('calendar-grid');
        return dayNumber >=1 && dayNumber <= 31 && isCalendarDayCell && el.textContent.trim() !== '';
    })

    expect(actualDayCells.length).toBe(daysInMonth);
  });

  test('navigates to the previous month', () => {
    render(<Calendar />);
    const currentDate = new Date();
    fireEvent.click(screen.getByText('Previous'));

    const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const previousMonthYearString = previousMonthDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    expect(screen.getByText(previousMonthYearString)).toBeInTheDocument();
  });

  test('navigates to the next month', () => {
    render(<Calendar />);
    const currentDate = new Date();
    fireEvent.click(screen.getByText('Next'));

    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const nextMonthYearString = nextMonthDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    expect(screen.getByText(nextMonthYearString)).toBeInTheDocument();
  });

  test('displays day names', () => {
    render(<Calendar />);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});
