import React, { FunctionComponent, useState } from 'react';

const SearchBar: FunctionComponent<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Search..." />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
