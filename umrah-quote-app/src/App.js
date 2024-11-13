// App.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'; // Import your custom theme
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // Ensure this is imported
import QuoteBuilder from './components/QuoteBuilder';
import QuoteEntries from './components/QuoteEntries';
import ViewQuote from './components/ViewQuote';
import DatePickerTest from './components/DatePickerTest';
import Header from './components/Header';

function App() {
  document.title = "Umrah Quote Builder - Aff Travel Net";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          {isLoggedIn && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
          <Routes>
            <Route path="/" element={isLoggedIn ? <QuoteBuilder /> : <Navigate replace to="/login" />} />
            <Route path="/login" element={isLoggedIn ? <Navigate replace to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={isLoggedIn ? <Navigate replace to="/" /> : <Register />} />
            <Route path="/quote-entries" element={isLoggedIn ? <QuoteEntries /> : <Navigate replace to="/login" />} />
            {/* Updated Route to Include Dynamic ID */}
            <Route path="/quote/:id" element={isLoggedIn ? <ViewQuote /> : <Navigate replace to="/login" />} />
            {/* Redirect any unknown paths to the home page */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/date-picker" element={isLoggedIn ? <DatePickerTest /> : <Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
