import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import InternshipCard from './components/InternshipCard';
import './styles.css';
const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"; ;

function App() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (keywords) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${backendUrl}/api/internships?keywords=${keywords}`);
      console.log(backendUrl);
      console.log(response);
      if (!response.ok) throw new Error('Failed to fetch internships');
      const data = await response.json();
      setInternships(data);
    } catch (err) {
      console.error('Error fetching internships:', err);
      setError('Failed to load internships. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Find Your Dream Internship</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="main">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Fetching internships...</p>
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : internships.length === 0 ? (
          <p className="no-results">No internships found. Try different keywords.</p>
        ) : (
          <div className="internship-list">
            {internships.map((internship, index) => (
              <InternshipCard key={index} internship={internship} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
