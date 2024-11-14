import React, { useState, useCallback, useEffect } from 'react';
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

useEffect(() => {
  // Compute the values only if they have changed
  const roomTypesString = makkahRooms.map(room => room.roomType).join(', ');
  const boardTypesString = makkahRooms.map(room => room.boardType).join(', ');

  // Only update Formik values if necessary
  if (
    formik.values.makkahRoomType !== roomTypesString ||
    formik.values.makkahBoardType !== boardTypesString ||
    formik.values.totalRoomsMakkah !== makkahRooms.length ||
    formik.values.totalBedsMakkah !== getTotalBeds()
  ) {
    formik.setFieldValue('makkahRoomType', roomTypesString);
    formik.setFieldValue('makkahBoardType', boardTypesString);
    formik.setFieldValue('totalRoomsMakkah', makkahRooms.length);
    formik.setFieldValue('totalBedsMakkah', getTotalBeds());
  }
}, [makkahRooms, formik]);

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

    useEffect(() => {
      const checkoutDate = getCheckoutDate(formik.values.makkahCheckInDate, formik.values.nightsInMakkah);
      if (checkoutDate !== formik.values.makkahCheckOutDate) {
        formik.setFieldValue('makkahCheckOutDate', checkoutDate);
      }
    }, [formik.values.makkahCheckInDate, formik.values.nightsInMakkah, formik]);

  // ... include other handlers and logic
  console.log(formik.values)
  return (
    <LocalizationProvider adapterLocale={'en-GB'} dateAdapter={AdapterLuxon}>
      <Typography variant="h6" gutterBottom>Hotel Details</Typography>
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
              name="firstDestination"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstDestination}
            >
              <FormControlLabel value="Makkah" control={<Radio />} label="Makkah First" />
              <FormControlLabel value="Madinah" control={<Radio />} label="Madinah First" />
            </RadioGroup>
            {formik.touched.firstDestination && formik.errors.firstDestination && (
              <Typography color="error">{formik.errors.firstDestination}</Typography>
            )}
          </FormControl>
        </Grid>

        {/* Makkah Hotel Name, Nights, and Rating */}
        <Grid item xs={12} sm={4}>
        <TextField
            fullWidth
            label="Makkah Hotel Name"
            name="makkahHotel"
            value={formik.values.makkahHotel}
            onChange={formik.handleChange}
            //onBlur={formik.handleBlur}
            error={formik.touched.makkahHotel && Boolean(formik.errors.makkahHotel)}
            helperText={formik.touched.makkahHotel && formik.errors.makkahHotel}
         
          />        
          </Grid>
        <Grid item xs={6} sm={4}>
        <TextField
            fullWidth
            label="No. of Nights in Makkah"
            type="number"
            name="nightsInMakkah"
            value={formik.values.nightsInMakkah}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nightsInMakkah && Boolean(formik.errors.nightsInMakkah)}
            helperText={formik.touched.nightsInMakkah && formik.errors.nightsInMakkah}
          />        
          </Grid>
        {/* Hotel Rating */}
        <Grid item xs={12} sm={4}>
          <Autocomplete
            name="makkahHotelRating"
            options={hotelRatings}
           
            value={formik.values.makkahHotelRating || null}
            onChange={(_, newValue) => formik.setFieldValue('makkahHotelRating', newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Makkah Hotel Rating"
                onBlur={formik.handleBlur}
                error={formik.touched.makkahHotelRating && Boolean(formik.errors.makkahHotelRating)}
                helperText={formik.touched.makkahHotelRating && formik.errors.makkahHotelRating}
              />
            )}
            fullWidth
          />
        </Grid>

        {/* Makkah Check-in and Check-out Dates */}
        <Grid item xs={12} sm={6}>
        <DatePicker
          name="makkahCheckInDate"
          label="Makkah Check In Date"
          value={formik.values.makkahCheckInDate ? DateTime.fromISO(formik.values.makkahCheckInDate) : null}
          onChange={(date) => formik.setFieldValue('makkahCheckInDate', date ? date.toISO() : '')}
          renderInput={(params) => (
            <TextField
              {...params}
              name="makkahCheckInDate"
              onBlur={formik.handleBlur}
              error={formik.touched.makkahCheckInDate && Boolean(formik.errors.makkahCheckInDate)}
              helperText={formik.touched.makkahCheckInDate && formik.errors.makkahCheckInDate}
            />
          )}
          fullWidth
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Makkah Check Out Date - calculated based on check-in date and nights */}
          <DatePicker
          name="makkahCheckOutDate"
          label="Makkah Check Out Date"
          value={formik.values.makkahCheckOutDate ? DateTime.fromISO(formik.values.makkahCheckOutDate) : null}
          renderInput={(params) => (
            <TextField
              {...params}
              name="makkahCheckOutDate"
              onBlur={formik.handleBlur}
              error={formik.touched.makkahCheckOutDate && Boolean(formik.errors.makkahCheckOutDate)}
              helperText={formik.touched.makkahCheckOutDate && formik.errors.makkahCheckOutDate}
              disabled
            />
          )}
          fullWidth
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
                name="makkahRoomType"
                options={roomTypes}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} label="Makkah Room Type" />}
                value={roomTypes.find(rt => rt.label === room.roomType) || null}
                onChange={(_, newValue) => {
                  const newRooms = [...makkahRooms];
                  newRooms[index].roomType = newValue ? newValue.label : '';
                  setMakkahRooms(newRooms);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.makkahRoomType && Boolean(formik.errors.makkahRoomType)}
                helperText={formik.touched.makkahRoomType && formik.errors.makkahRoomType}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={boardTypes}
                renderInput={(params) => <TextField {...params} label="Makkah Board Type" />}
                value={room.boardType || ''}
                onChange={(_, newValue) => {
                  const newRooms = [...makkahRooms];
                  newRooms[index].boardType = newValue || '';
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
            name="totalRoomsMakkah"
            label="Total Rooms in Makkah"
            type="number"
            value={makkahRooms.length}
            InputProps={{
              readOnly: true,
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.makkahBoardType && Boolean(formik.errors.makkahBoardType)}
            helperText={formik.touched.makkahBoardType && formik.errors.makkahBoardType}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="No. of extra infant beds in Makkah"
            type="number"
            value={formik.values.extraInfantBedsMakkah}
            onChange={formik.handleChange}
            name="extraInfantBedsMakkah"
            onBlur={formik.handleBlur}
            error={formik.touched.extraInfantBedsMakkah && Boolean(formik.errors.extraInfantBedsMakkah)}
            helperText={formik.touched.extraInfantBedsMakkah && formik.errors.extraInfantBedsMakkah}            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="totalBedsMakkah"
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
