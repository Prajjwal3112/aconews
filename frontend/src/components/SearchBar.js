// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <input
        className="border border-gray-300 p-2 rounded-l-lg"
        type="text"
        placeholder="Search for news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-r-lg"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
