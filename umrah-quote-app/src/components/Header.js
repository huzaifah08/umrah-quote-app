import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/afflogo.png'; // Adjust the path as necessary
import logoutIcon from '../assets/logout.png'; // Adjust the path as necessary

// Pass isLoggedIn and onLogout as props
function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate(); // To programmatically navigate after logging out

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Call the logout handler passed as a prop
      navigate('/login'); // Redirect to login page after logging out
    }
  };

  return (
    <header className="App-header">
      <div>
        <img src={logo} alt="Logo" className="App-logo" />
      </div>
      <nav className="App-nav">
        <Link to="/quote-builder" className="App-link">Umrah Quote Builder</Link>
        <Link to="/quote-entries" className="App-link">Umrah Quote Entries</Link>
        <Link to="/date-picker" className="App-link">DatePicker</Link>

      </nav>
      {isLoggedIn && (
        <div>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src={logoutIcon} alt="Logout" style={{ height: '32px' }} />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
