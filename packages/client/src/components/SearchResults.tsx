import SearchSection from './SearchSection';
import { Hotel, City, Country } from '../types/types';

type SearchResultsProps = {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
};

const SearchResults = ({ hotels, cities, countries }: SearchResultsProps) => (
  <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
    <SearchSection title="Hotels" items={hotels} renderItem={(hotel) => (
      <a href={`/hotels/${hotel._id}`} className="dropdown-item">
        <i className="fa fa-building mr-2"></i>
        {hotel.hotel_name}
      </a>
    )} />
    <SearchSection title="Countries" items={countries} renderItem={(country) => (
      <a href={`/country/${country.country}`} className="dropdown-item">
        <i className="fa fa-building mr-2"></i>
        {country.country}
      </a>
    )} />
    <SearchSection title="Cities" items={cities} renderItem={(city) => (
      <a href={`/city/${city.name}`} className="dropdown-item">
        <i className="fa fa-building mr-2"></i>
        {city.name}
      </a>
    )} />
  </div>
);

export default SearchResults;
