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
import Dashboard from './components/Dashboard'; // Dashboard component

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

  const handleUserRegistered = () => {
    console.log('User registered successfully!');
    // Optionally, perform additional actions like showing a success notification
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FCFCFC' }}>
          {/* Only render the sidebar when logged in */}
          {isLoggedIn && <Sidebar onLogout={handleLogout} />}
          <div
            style={{
              flexGrow: 1,
              backgroundColor: '#FCFCFC', // Main content background color
              padding: '20px',
              boxSizing: 'border-box',
              marginLeft: isLoggedIn ? 240 : 0, // Adjust content margin based on sidebar visibility
              transition: 'margin-left 0.3s ease', // Smooth transition when sidebar toggles
            }}
          >
            <Routes>
              <Route path="" element={isLoggedIn ? <Dashboard /> : <Navigate replace to="/login" />} />
              <Route path="/quote-builder" element={isLoggedIn ? <QuoteBuilder /> : <Navigate replace to="/login" />} />
              <Route path="/login" element={isLoggedIn ? <Navigate replace to="/" /> : <Login onLogin={handleLogin} />} />
              <Route
                path="/register"
                element={
                  isLoggedIn ? (
                    <Navigate replace to="/" />
                  ) : (
                    <Register onUserRegistered={handleUserRegistered} />
                  )
                }
              />
              <Route path="/quote-entries" element={isLoggedIn ? <QuoteEntries /> : <Navigate replace to="/login" />} />
              <Route path="/quote/:id" element={isLoggedIn ? <ViewQuote /> : <Navigate replace to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/date-picker" element={isLoggedIn ? <DatePickerTest /> : <Navigate replace to="/login" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
