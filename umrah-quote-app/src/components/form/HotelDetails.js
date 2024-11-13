import React, { useState, useCallback } from 'react';
import { Grid, Typography, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Button, Divider, Autocomplete } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings, DateTime } from 'luxon';
import { addDays, format } from 'date-fns';


// Set Luxon to use the UK locale globally
Settings.defaultLocale = 'en-GB';

function HotelDetails({ formik }) {
  const [makkahRooms, setMakkahRooms] = useState([{ roomType: '', boardType: '' }]);
  const [madinahRooms, setMadinahRooms] = useState([{ roomType: '', boardType: '' }]);

  // Assuming formik.values.departureDate and formik.values.returnDate are ISO date strings
const formattedDepartureDate = formik.values.departureDate 
? format(new Date(formik.values.departureDate), 'dd/MM/yyyy')
: '';

const formattedReturnDate = formik.values.returnDate 
? format(new Date(formik.values.returnDate), 'dd/MM/yyyy')
: '';

const hotelRatings = ["5 Star", "4 Star", "3 Star", "Economy"];
const roomTypes = [
  { label: "Single", beds: 1 },
  { label: "Double", beds: 2 },
  { label: "Triple", beds: 3 },
  { label: "Quad", beds: 4 },
  { label: "Quint", beds: 5 }
];

const boardTypes = ["Room Only", "Bed & Breakfast", "Half Board", "Full Board"];

const getRoomCount = useCallback(() => makkahRooms.length, [makkahRooms]);

const getTotalBeds = useCallback(() => {
  return makkahRooms.reduce((total, room) => {
    const roomTypeObj = roomTypes.find(rt => rt.label === room.roomType);
    return total + (roomTypeObj ? roomTypeObj.beds : 0);
  }, 0);
}, [makkahRooms]);

  const addRoom = useCallback((setRooms) => {
    setRooms((prevRooms) => [...prevRooms, { roomType: '', boardType: '' }]);
  }, []);

  const removeRoom = useCallback((setRooms, index) => {
    setRooms((prevRooms) => prevRooms.filter((_, i) => i !== index));
  }, []);

  const RoomDivider = ({ title }) => (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );

    // Calculate checkout date based on checkin and nights
    const getCheckoutDate = (checkin, nights) => {
      if (!checkin || !nights) return null;
      const checkinDate = DateTime.fromISO(checkin);
      return checkinDate.plus({ days: nights }).toISODate(); // Returns an ISO string
    };

  // ... include other handlers and logic

  return (
    <LocalizationProvider adapterLocale={'en-GB'} dateAdapter={AdapterLuxon}>
      <Typography variant="h5" gutterBottom>Hotel Details</Typography>
      <Grid container spacing={2}>
        {/* Display departure and return dates from formik state */}
        <Grid item xs={12}>
          <Typography>Departure Date: {formattedDepartureDate}</Typography>
          <Typography>Return Date: {formattedReturnDate}</Typography>
        </Grid>

        {/* Radio buttons for Makkah or Madinah first */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              name="cityFirst"
              onChange={formik.handleChange}
              value={formik.values.cityFirst}
            >
              <FormControlLabel value="Makkah" control={<Radio />} label="Makkah First" />
              <FormControlLabel value="Madinah" control={<Radio />} label="Madinah First" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Makkah Hotel Name, Nights, and Rating */}
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Makkah Hotel Name" value={formik.values.makkahHotel} onChange={formik.handleChange} name="makkahHotel" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField fullWidth label="No. of Nights in Makkah" type="number" value={formik.values.nightsInMakkah} onChange={formik.handleChange} name="nightsInMakkah" />
        </Grid>
        {/* Hotel Rating */}
        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={hotelRatings}
            renderInput={(params) => <TextField {...params} label="Makkah Hotel Rating" />}
            value={formik.values.hotelRating}
            onChange={(_, newValue) => formik.setFieldValue('hotelRating', newValue)}
            fullWidth
          />
        </Grid>

        {/* Makkah Check-in and Check-out Dates */}
        <Grid item xs={12} sm={6}>
        <DatePicker
          label="Makkah Check In Date"
          value={formik.values.makkahCheckIn ? DateTime.fromISO(formik.values.makkahCheckIn) : null}
          onChange={(date) => formik.setFieldValue('makkahCheckIn', date ? date.toISO() : '')}
          renderInput={(params) => <TextField {...params} />}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Makkah Check Out Date - calculated based on check-in date and nights */}
          <DatePicker
          label="Makkah Check Out Date"
          value={
            formik.values.makkahCheckIn && formik.values.nightsInMakkah
              ? DateTime.fromISO(getCheckoutDate(formik.values.makkahCheckIn, formik.values.nightsInMakkah))
              : null
          }
          renderInput={(params) => <TextField {...params} disabled />}
        />
        </Grid>

        {/* Makkah Hotel Refund Policy */}
        <Grid item xs={12}>
          {/* ... include RadioGroup for refund policy here */}
        </Grid>

        {/* Makkah Rooms */}
        {makkahRooms.map((room, index) => (
          <React.Fragment key={index}>
            <RoomDivider title={`Room ${index + 1}`} />
            <Grid item xs={6}>
              <Autocomplete
                options={roomTypes}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} label="Makkah Room Type" />}
                value={roomTypes.find(rt => rt.label === makkahRooms[index].roomType) || null}
                onChange={(_, newValue) => {
                  const newRooms = [...makkahRooms];
                  newRooms[index].roomType = newValue ? newValue.label : '';
                  setMakkahRooms(newRooms);
                  formik.setFieldValue(`makkahRooms[${index}].roomType`, newValue ? newValue.label : '');
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={boardTypes}
                renderInput={(params) => <TextField {...params} label="Makkah Board Type" />}
                value={room.boardType}
                onChange={(_, newValue) => {
                  const newRooms = [...makkahRooms];
                  newRooms[index].boardType = newValue;
                  setMakkahRooms(newRooms);
                }}
                fullWidth
                
              />
              
            </Grid>

            {makkahRooms.length > 1 && (
              <Grid item xs={12}>
                <Button onClick={() => removeRoom(setMakkahRooms, index)}>Remove Room</Button>
              </Grid>
            
            )}
          </React.Fragment>
        ))}
        <Grid item xs={12}>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => addRoom(setMakkahRooms)}>Add Room</Button>
        </Grid>

        {/* Room counts */}
        <Grid item xs={4}>
          <TextField
            label="Total Rooms in Makkah"
            type="number"
            value={getRoomCount()}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="No. of extra infant beds in Makkah"
            type="number"
            value={formik.values.extraInfantBeds}
            onChange={formik.handleChange}
            name="extraInfantBeds"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Total Beds in Makkah"
            type="number"
            value={getTotalBeds()}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>

        {/* Repeat all the above for Madinah Rooms... */}



      </Grid>
    </LocalizationProvider>
  );
}

export default HotelDetails;
