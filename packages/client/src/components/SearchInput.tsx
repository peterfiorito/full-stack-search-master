import { ChangeEvent } from 'react';

type SearchInputProps = {
  searchValue: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearClick: () => void;
  showClearBtn: boolean;
};

const SearchInput = ({ searchValue, onSearchChange, onClearClick, showClearBtn }: SearchInputProps) => (
  <div className="form">
    <i className="fa fa-search"></i>
    <input
      type="text"
      className="form-control form-input"
      placeholder="Search accommodation..."
      onChange={onSearchChange}
      value={searchValue}
    />
    {showClearBtn && (
      <span className="left-pan clear-button" onClick={onClearClick} role="button" aria-label="clear">
        <i className="fa fa-close"></i>
      </span>
    )}
  </div>
);

export default SearchInput;
