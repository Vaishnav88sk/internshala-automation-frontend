import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import InternshipCard from './components/InternshipCard';
import './styles.css';

import LoginPage from './components/LoginPage'; // Import LoginPage
import SignupPage from './components/SignupPage'; // Import SignupPage

function App() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [appliedInternships, setAppliedInternships] = useState([]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if the user is logged in when the component mounts (using localStorage)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setIsLoggedIn(true);
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  // const handleSearch = async (keywords) => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/internships?keywords=${keywords}`);
  //     if (!response.ok) throw new Error('Failed to fetch internships');
  //     const data = await response.json();
  //     setInternships(data);
  //   } catch (err) {
  //     console.error('Error fetching internships:', err);
  //     setError('Failed to load internships. Try again.');
  //   }
  //   setLoading(false);
  // };

  const handleSearch = async (filters) => {
    setLoading(true);
    setError('');
  
    // Construct the search URL with filters
    const queryParams = new URLSearchParams(filters).toString();
    
    try {
      const response = await fetch(`http://localhost:5000/api/internships?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch internships');
      const data = await response.json();
      setInternships(data);
    } catch (err) {
      console.error('Error fetching internships:', err);
      setError('Failed to load internships. Try again.');
    }
    
    setLoading(false);
  };
  

  const handleApply = (internship) => {
    console.log("Applying for internship: ", internship);
    setAppliedInternships(prevApplied => {
      if (!prevApplied.some(item => item.url === internship.url)) {
        return [...prevApplied, internship];
      }
      return prevApplied;
    });
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
        <h1 className="app-title">InternConnect</h1>
          {isLoggedIn ? (
            <div className="header-right">
              <p>Welcome, {user.email}</p>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        </header>

        <main className="main">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
          <Route
              path="/home"
              element={
                isLoggedIn ? (
                  <>
                    <h1>Find Your Dream Internship</h1>
                    <SearchBar onSearch={handleSearch} />
                    {/* Conditionally render loading message or internships */}
                    {loading ? (
                      <p>Fetching internships...</p>  
                    ) : error ? (
                      <p>{error}</p>  
                    ) : (
                      <div className="internship-list">
                        {internships.map((internship, index) => (
                          <InternshipCard
                            key={index}
                            internship={internship}
                            onApply={handleApply}
                          />
                        ))}
                      </div>
                    )}

                    {appliedInternships.length > 0 && (
                      <section className="applied-section">
                        <h2>Applied Internships</h2>
                        <div className="internship-list">
                          {appliedInternships.map((internship, index) => (
                            <InternshipCard
                              key={index}
                              internship={internship}
                              onApply={handleApply}
                            />
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
