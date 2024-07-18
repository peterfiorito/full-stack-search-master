import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { Hotel, City, Country } from '../types/types';

const hotels: Hotel[] = [
  { _id: '1', chain_name: 'Chain', hotel_name: 'Hotel 1', city: 'City 1', country: 'Country 1' },
  { _id: '2', chain_name: 'Chain', hotel_name: 'Hotel 2', city: 'City 2', country: 'Country 2' },
];

const cities: City[] = [
  { name: 'City 1' },
  { name: 'City 2' },
];

const countries: Country[] = [
  { country: 'Country 1', countryisocode: 'C1' },
  { country: 'Country 2', countryisocode: 'C2' },
];

test('renders search results', () => {
  render(<SearchResults hotels={hotels} cities={cities} countries={countries} />);
  expect(screen.getByText('Hotels')).toBeInTheDocument();
  expect(screen.getByText('Hotel 1')).toBeInTheDocument();
  expect(screen.getByText('Countries')).toBeInTheDocument();
  expect(screen.getByText('Country 1')).toBeInTheDocument();
  expect(screen.getByText('Cities')).toBeInTheDocument();
  expect(screen.getByText('City 1')).toBeInTheDocument();
});

test('renders no hotels matched message', () => {
  render(<SearchResults hotels={[]} cities={cities} countries={countries} />);
  expect(screen.getByText('No hotels matched')).toBeInTheDocument();
});

test('renders no countries matched message', () => {
  render(<SearchResults hotels={hotels} cities={cities} countries={[]} />);
  expect(screen.getByText('No countries matched')).toBeInTheDocument();
});

test('renders no cities matched message', () => {
  render(<SearchResults hotels={hotels} cities={[]} countries={countries} />);
  expect(screen.getByText('No cities matched')).toBeInTheDocument();
});
