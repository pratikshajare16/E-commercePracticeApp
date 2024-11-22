import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { ThemedComponent, ThemeProvider } from './Components/Week_3_Study/ThemedComponent';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders with light theme by default', () => {
  render(
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );

  const themeText = screen.getByText(/Current theme: light/i);
  expect(themeText).toBeInTheDocument();
  expect(themeText).toHaveStyle('color: black');

  const themedContainer = screen.getByTestId('themed-container');
  expect(themedContainer).toHaveStyle('background-color: white');
});

test('toggles theme to dark', () => {
  render(
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );

  const toggleButton = screen.getByText(/toggle theme/i);
  fireEvent.click(toggleButton);

  const themeText = screen.getByText(/Current theme: dark/i);
  expect(themeText).toBeInTheDocument();
  expect(themeText).toHaveStyle('color: white');

  const themedContainer = screen.getByTestId('themed-container');
  expect(themedContainer).toHaveStyle('background-color: black');
});

test('toggles theme back to light', () => {
  render(
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );

  const toggleButton = screen.getByText(/toggle theme/i);
  fireEvent.click(toggleButton); // Switch to dark
  fireEvent.click(toggleButton); // Switch back to light

  const themeText = screen.getByText(/Current theme: light/i);
  expect(themeText).toBeInTheDocument();
  expect(themeText).toHaveStyle('color: black');

  const themedContainer = screen.getByTestId('themed-container');
  expect(themedContainer).toHaveStyle('background-color: white');
});
