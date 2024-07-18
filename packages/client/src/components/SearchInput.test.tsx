import { expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';

const mockOnSearchChange = vi.fn();
const mockOnClearClick = vi.fn();

test('renders search input', () => {
  render(
    <SearchInput
      searchValue=""
      onSearchChange={mockOnSearchChange}
      onClearClick={mockOnClearClick}
      showClearBtn={false}
    />
  );
  const input = screen.getByPlaceholderText('Search accommodation...');
  expect(input).toBeInTheDocument();
});

test('calls onSearchChange when input changes', () => {
  render(
    <SearchInput
      searchValue=""
      onSearchChange={mockOnSearchChange}
      onClearClick={mockOnClearClick}
      showClearBtn={false}
    />
  );
  const input = screen.getByPlaceholderText('Search accommodation...');
  fireEvent.change(input, { target: { value: 'new search' } });
  expect(mockOnSearchChange).toHaveBeenCalled();
});

test('calls onClearClick when clear button is clicked', () => {
  render(
    <SearchInput
      searchValue="test"
      onSearchChange={mockOnSearchChange}
      onClearClick={mockOnClearClick}
      showClearBtn={true}
    />
  );
  const clearButton = screen.getByRole('button');
  fireEvent.click(clearButton);
  expect(mockOnClearClick).toHaveBeenCalled();
});
