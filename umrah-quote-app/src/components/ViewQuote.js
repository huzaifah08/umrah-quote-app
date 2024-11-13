import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ViewQuote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);


    // Fetch the quote details
    const fetchQuote = async () => {
        try {
          const response = await fetch(`http://localhost:3001/quote/${id}`);
          const data = await response.json();
          setQuote(data);
        } catch (error) {
          console.error('Failed to fetch quote:', error);
        }
      };
  
      // Fetch version history
      const fetchVersionHistory = async () => {
        try {
          const response = await fetch(`http://localhost:3001/quote-versions/${id}`);
          const versions = await response.json();
          setVersionHistory(versions);
        } catch (error) {
          console.error('Failed to fetch version history:', error);
        }
      };


  useEffect(() => {


    fetchQuote();
    fetchVersionHistory();
  }, [id]);

  const handleRestoreVersion = async (versionId) => {
    try {
      const response = await fetch(`http://localhost:3001/restore-quote-version/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ version_id: versionId }),
      });

      if (response.ok) {
        // Alert the user about the successful restoration
        alert('Quote restored to the selected version.');
  
        // Re-fetch the updated quote details and version history
        fetchQuote(); // Re-fetch quote data
        fetchVersionHistory(); // Re-fetch version history
      } else {
        alert('Failed to restore the quote version.');
      }
    } catch (error) {
      console.error('Error restoring quote version:', error);
    }
  };

  if (!quote) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Quote Details</Typography>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6">Quote ID: {quote.id}</Typography>
        <Typography>Consultant Initials: {quote.consultant_initials}</Typography>
        <Typography>First Name: {quote.first_name}</Typography>
        <Typography>Last Name: {quote.last_name}</Typography>
        <Typography>Email: {quote.email}</Typography>
        <Typography>Phone Number: {quote.phone_number}</Typography>
        <Typography>Departure Date: {new Date(quote.departure_date).toLocaleDateString()}</Typography>
        <Typography>Return Date: {new Date(quote.return_date).toLocaleDateString()}</Typography>
        <Typography>Grand Total: £{quote.grand_total ? quote.grand_total.toFixed(2) : '0.00'}</Typography>              
        {/* Add other fields as needed */}
        <Button variant="contained" color="primary" onClick={() => navigate(`/edit-quote/${id}`)}>
          Edit Quote
        </Button>
      </Paper>

      <Typography variant="h5" style={{ marginTop: '40px' }}>Version History</Typography>
      {versionHistory.map((version, index) => {
        // Parse the version_data JSON
        const versionData = JSON.parse(version.version_data);

        return (
          <Accordion key={version.version_id} style={{ marginTop: '10px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography>
                  Version {index + 1} - {new Date(version.created_at).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleRestoreVersion(version.version_id)}
                >
                  Restore
                </Button>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {Object.entries(versionData).map(([key, value]) => (
                  <ListItem key={key}>
                    <ListItemText primary={`${key}: ${value}`} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default ViewQuote;
