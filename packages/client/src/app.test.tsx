import { expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './app';

vi.mock('./apis/searchApi', () => ({
  fetchSearchResults: vi.fn().mockResolvedValue({
    hotels: [
      { _id: '1', chain_name: 'Chain', hotel_name: 'Hotel 1', city: 'City 1', country: 'Country 1' }
    ],
    cities: [
      { name: 'City 1' }
    ],
    countries: [
      { country: 'Country 1', countryisocode: 'C1' }
    ]
  })
}));

test('renders search input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Search accommodation...');
  expect(input).toBeInTheDocument();
});

test('fetches and displays search results', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Search accommodation...');
  
  fireEvent.change(input, { target: { value: 'test' } });
  
  const hotelItem = await screen.findByText('Hotel 1');
  expect(hotelItem).toBeInTheDocument();

  const cityItem = await screen.findByText('City 1');
  expect(cityItem).toBeInTheDocument();

  const countryItem = await screen.findByText('Country 1');
  expect(countryItem).toBeInTheDocument();
});

test('clears search results', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Search accommodation...');
  
  fireEvent.change(input, { target: { value: 'test' } });
  
  const clearButton = await screen.findByRole('button', { name: 'clear' });
  fireEvent.click(clearButton);
  
  const hotelItem = screen.queryByText('Hotel 1');
  expect(hotelItem).not.toBeInTheDocument();

  const cityItem = screen.queryByText('City 1');
  expect(cityItem).not.toBeInTheDocument();

  const countryItem = screen.queryByText('Country 1');
  expect(countryItem).not.toBeInTheDocument();
});
