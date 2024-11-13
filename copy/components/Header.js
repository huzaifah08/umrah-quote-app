import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/afflogo.png'; // Adjust the path as necessary
import logoutIcon from '../assets/logout.png'; // Adjust the path as necessary

function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <div>
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
      </div>
      <nav>
        <Link to="/quote-builder" style={{ margin: '0 10px' }}>Umrah Quote Builder</Link>
        <Link to="/quote-entries" style={{ margin: '0 10px' }}>Umrah Quote Entries</Link>
      </nav>
      <div>
        <button onClick={() => alert('Log out logic here')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <img src={logoutIcon} alt="Logout" style={{ height: '32px' }} />
        </button>
      </div>
    </header>
  );
}

export default Header;
