import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      onSearch(keywords);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Search internships (e.g., Python, remote, marketing)"
        className="search-input"
      />
      <button type="submit" className="search-button">🔍 Search</button>
    </form>
  );
}

export default SearchBar;
