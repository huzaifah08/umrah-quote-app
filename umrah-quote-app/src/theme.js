import { createTheme } from '@mui/material/styles';

// Create a custom theme.
const theme = createTheme({
    palette: {
      primary: {
        main: '#25327B',
      },
      // Add your color and typography overrides here
    },
    components: {
      
      MuiButton: {
        styleOverrides: {
          root: {
            // Your button style overrides
          },
        },
        
      },
      MuiAutocomplete: {
        styleOverrides: {

          // Name of the rule
          root: {
            // Some CSS
            display: 'flex', 
            alignItems: 'center', // This ensures vertical alignment is centered
            position: 'relative', // Added relative positioning
            top: 0, // Adjust this value as needed (positive or negative)
          },
          
        },
      },
      MuiSelect: {
        styleOverrides: {

          // Name of the rule
          root: {
            // Some CSS
            display: 'flex', 
            alignItems: 'center', // This ensures vertical alignment is centered
            position: 'relative', // Added relative positioning
            top: 16, // Adjust this value as needed (positive or negative)
            textAlign: 19,
          },
          
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            // Your custom styles here


          },
        },
      }


      



  
      // Add more component overrides here
      
      
    },
  });

  export { theme };