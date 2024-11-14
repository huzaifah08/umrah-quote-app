import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
} from '@mui/material';

function QuoteEntries() {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quotes from the backend API
    const fetchQuotes = async () => {
      try {
        const response = await fetch('http://localhost:3001/umrah-quotes'); // Adjust the URL to your API endpoint
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
      }
    };
    fetchQuotes();
  }, []);

  const handleViewQuote = (id) => {
    navigate(`/quote/${id}`); // Navigate to the detailed quote page
  };

  const handleQuoteAcceptedChange = async (id, isChecked) => {
    try {
      // Update the quote_accepted status in the backend
      const response = await fetch(`http://localhost:3001/update-quote-status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteAccepted: isChecked }),
      });

      if (response.ok) {
        // Update the state to reflect the change without refetching all data
        setQuotes((prevQuotes) =>
          prevQuotes.map((quote) =>
            quote.id === id ? { ...quote, quote_accepted: isChecked } : quote
          )
        );
      } else {
        console.error('Failed to update quote status');
      }
    } catch (error) {
      console.error('Error updating quote status:', error);
    }
  };
  


  return (
    <div style={{ padding: '20px' }}>
      <h2>Umrah Quote Entries</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entry ID</TableCell>
              <TableCell>Quote Accepted</TableCell>
              <TableCell>Consultant Initials</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>No. of Nights</TableCell>
              <TableCell>Grand Total</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.map((quote) => {
                // Log the created_at value to see what you're receiving
                console.log('Created At:', quote.created_at);

            return (
              <TableRow key={quote.id}>
                <TableCell>{quote.id}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={quote.quote_accepted}
                    onChange={(e) => handleQuoteAcceptedChange(quote.id, e.target.checked)}
                  />
                </TableCell>
                <TableCell>{quote.consultant_initials}</TableCell>
                <TableCell>{quote.first_name}</TableCell>
                <TableCell>{quote.last_name}</TableCell>
                <TableCell>{quote.email}</TableCell>
                <TableCell>{quote.phone_number}</TableCell>
                <TableCell>{new Date(quote.departure_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(quote.return_date).toLocaleDateString()}</TableCell>
                <TableCell>{quote.total_nights}</TableCell>
                <TableCell>£{quote.grand_total}</TableCell>
                <TableCell>{new Date(quote.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewQuote(quote.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default QuoteEntries;
