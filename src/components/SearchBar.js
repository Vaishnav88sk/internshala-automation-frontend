// import React, { useState } from 'react';

// function SearchBar({ onSearch }) {
//   const [keywords, setKeywords] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (keywords.trim()) {
//       onSearch(keywords);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-bar">
//       <input
//         type="text"
//         value={keywords}
//         onChange={(e) => setKeywords(e.target.value)}
//         placeholder="Search internships (e.g., Python, remote, marketing)"
//         className="search-input"
//       />
//       <button type="submit" className="search-button">🔍 Search</button>
//     </form>
//   );
// }

// export default SearchBar;

import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [stipend, setStipend] = useState('');
  const [internshipType, setInternshipType] = useState('');
  const [duration, setDuration] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // If advanced filters are being used, include them in the search
    const filters = {
      keywords,
      stipend,
      duration,
    };
    onSearch(filters); // Send all filters to the parent for the search API
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

      {/* Advanced Search Toggle Button */}
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className="advanced-search-button"
      >
        {showFilters ? 'Hide Filters' : 'Advanced Search'}
      </button>

      {/* Advanced Search Filters */}
      {showFilters && (
        <div className="advanced-filters">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="filter-input"
          />
          <input
            type="text"
            value={stipend}
            onChange={(e) => setStipend(e.target.value)}
            placeholder="Min. Stipend"
            className="filter-input"
          />
          <select
            value={internshipType}
            onChange={(e) => setInternshipType(e.target.value)}
            className="filter-input"
          >
            <option value="">Internship Type</option>
            <option value="remote">Remote</option>
            <option value="in-office">In-office</option>
            <option value="hybrid">Hybrid</option>
          </select>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="filter-input"
          >
            <option value="">Duration</option>
            <option value="1 Month">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
          </select>
        </div>
      )}
    </form>
  );
}

export default SearchBar;
