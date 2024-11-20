import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import { EditNote, PlaylistAddCheck, Group, Settings, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/afflogo.png'; // Ensure the logo path is correct

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/login');
    }
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { text: 'Quote Builder', icon: <EditNote fontSize="small" />, path: '/quote-builder' },
    { text: 'Quote Entries', icon: <PlaylistAddCheck fontSize="small" />, path: '/quote-entries' },
    { text: 'Customers', icon: <Group fontSize="small" />, path: '/customers' },
  ];

  const settingsItem = { text: 'Settings', icon: <Settings fontSize="small" />, path: '/settings' };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: 240, // Sidebar width remains the same
          backgroundColor: '#F5F6FA',
          color: '#74777C',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '100px' }} /> {/* Adjusted logo size */}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            button
            onClick={() => navigate(item.path)}
            sx={{
              color: isActive(item.path) ? '#0B0E14' : '#74777C',
              '&:hover': {
                backgroundColor: '#D9DDE3',
                borderRadius: '16px',
              },
              ...(isActive(item.path) && {
                backgroundColor: '#D9DDE3',
                borderRadius: '16px',
                color: '#0B0E14',
              }),
              width: '90%', // Reduce the width of the tile itself
              height: '25%',
              margin: '0 auto', // Center the tile horizontally
              px: 2, // Adjust padding for a compact look
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: '28px' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                fontWeight: '700',
                fontSize: '13px',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => navigate(settingsItem.path)}
          sx={{
            color: isActive(settingsItem.path) ? '#0B0E14' : '#74777C',
            '&:hover': {
              backgroundColor: '#D9DDE3',
              borderRadius: '16px',
            },
            ...(isActive(settingsItem.path) && {
              backgroundColor: 'D9DDE3',
              borderRadius: '16px',
              color: '#0B0E14',
            }),
            width: '90%', // Reduce the width of the tile itself
            height: '50%',
            margin: '0 auto', // Center the tile horizontally
            px: 2, // Adjust padding for a compact look
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: '28px' }}>{settingsItem.icon}</ListItemIcon>
          <ListItemText
            primary={settingsItem.text}
            sx={{
              fontWeight: '700',
              fontSize: '13px',
            }}
          />
        </ListItem>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            color: '#74777C',
            '&:hover': {
              backgroundColor: '#D9DDE3',
              borderRadius: '16px',
              color: '#cd3838'
            },
            width: '90%', // Reduce the width of the tile itself
            height: '50%',
            margin: '0 auto', // Center the tile horizontally
            px: 2, // Adjust padding for a compact look
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: '28px' }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{
              fontWeight: '700',
              fontSize: '13px',
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
