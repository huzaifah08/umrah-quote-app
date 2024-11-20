import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'; // Your custom theme
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import QuoteBuilder from './components/QuoteBuilder';
import QuoteEntries from './components/QuoteEntries';
import ViewQuote from './components/ViewQuote';
import DatePickerTest from './components/DatePickerTest';
import Sidebar from './components/Sidebar'; // Sidebar component
import Header from './components/Header'; // Top Navbar component

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
      <Router basename={process.env.REACT_APP_PUBLIC_URL}>
      <div
            style={{
              flexGrow: 1,
              backgroundColor: '#FCFCFC', // Main content background color
              padding: '20px',
              minHeight: '100vh',
              boxSizing: 'border-box',
              marginLeft: 240, // Ensure content does not overlap sidebar
            }}
          >

          {isLoggedIn && <Sidebar onLogout={handleLogout} />} {/* Sidebar for navigation */}
    
            <Routes>
              <Route path="/quote-builder" element={isLoggedIn ? <QuoteBuilder /> : <Navigate replace to="/login" />} />
              <Route path="/login" element={isLoggedIn ? <Navigate replace to="/" /> : <Login onLogin={handleLogin} />} />
              <Route path="/register" element={isLoggedIn ? <Navigate replace to="/" /> : <Register />} />
              <Route path="/quote-entries" element={isLoggedIn ? <QuoteEntries /> : <Navigate replace to="/login" />} />
              <Route path="/quote/:id" element={isLoggedIn ? <ViewQuote /> : <Navigate replace to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/date-picker" element={isLoggedIn ? <DatePickerTest /> : <Navigate replace to="/login" />} />
            </Routes>

        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
