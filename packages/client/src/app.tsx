import { useState, type ChangeEvent } from 'react';
import { Hotel, City, Country } from './types/types';

import { fetchSearchResults } from './apis/searchApi';
import SearchResults from './components/SearchResults';
import SearchInput from './components/SearchInput';


function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value === '') {
      setHotels([]);
      setCities([]);
      setCountries([]);
      setShowClearBtn(false);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { hotels, cities, countries } = await fetchSearchResults(value);
      setHotels(hotels);
      setCities(cities);
      setCountries(countries);
      setShowClearBtn(true);
      setError(null);
    } catch (e) {
      setError('Failed to fetch search results');
      setHotels([]);
      setCities([]);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearClick = () => {
    setSearchValue('');
    setHotels([]);
    setCities([]);
    setCountries([]);
    setShowClearBtn(false);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
            <SearchInput
                searchValue={searchValue}
                onSearchChange={fetchData}
                onClearClick={handleClearClick}
                showClearBtn={showClearBtn}
              />
              {loading && <p>Loading...</p>}
              {error && <p className="text-error">{error}</p>}
              {searchValue && <SearchResults hotels={hotels} cities={cities} countries={countries} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
