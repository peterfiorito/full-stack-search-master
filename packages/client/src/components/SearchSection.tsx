import React from 'react';

type SearchSectionProps<T> = {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

const SearchSection = <T,>({ title, items, renderItem }: SearchSectionProps<T>) => (
  <>
    <h2>{title}</h2>
    {items.length ? items.map((item, index) => (
      <li key={index}>
        {renderItem(item)}
        <hr className="divider" />
      </li>
    )) : <p>No {title.toLowerCase()} matched</p>}
  </>
);

export default SearchSection;
