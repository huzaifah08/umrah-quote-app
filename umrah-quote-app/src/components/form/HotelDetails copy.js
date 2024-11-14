import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Typography, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Button, Divider, Autocomplete } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings, DateTime } from 'luxon';

// Set Luxon to use the UK locale globally
Settings.defaultLocale = 'en-GB';

function HotelDetails({ formik }) {
  const [makkahRooms, setMakkahRooms] = useState([{ roomType: '', boardType: '' }]);
  const [madinahRooms, setMadinahRooms] = useState([{ roomType: '', boardType: '' }]);

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
    const roomTypesString = makkahRooms.map(room => room.roomType).join(', ');
    const boardTypesString = makkahRooms.map(room => room.boardType).join(', ');
    formik.setFieldValue('makkahRoomType', roomTypesString);
    formik.setFieldValue('makkahBoardType', boardTypesString);
    formik.setFieldValue('totalRoomsMakkah', makkahRooms.length);
    formik.setFieldValue('totalBedsMakkah', getTotalBeds());
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

  useEffect(() => {
    const checkoutDate = getCheckoutDate(formik.values.makkahCheckInDate, formik.values.nightsInMakkah);
    if (checkoutDate !== formik.values.makkahCheckOutDate) {
      formik.setFieldValue('makkahCheckOutDate', checkoutDate);
    }
  }, [formik.values.makkahCheckInDate, formik.values.nightsInMakkah, formik]);

  const getCheckoutDate = (checkin, nights) => {
    if (!checkin || !nights) return null;
    const checkinDate = DateTime.fromISO(checkin);
    return checkinDate.plus({ days: nights }).toISODate();
  };

  return (
    <LocalizationProvider adapterLocale={'en-GB'} dateAdapter={AdapterLuxon}>
      <Typography variant="h5" gutterBottom>Hotel Details</Typography>
      <Grid container spacing={2}>
        {/* First Destination */}
        <Grid item xs={12}>
          <FormControl component="fieldset" required>
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

        {/* Makkah Hotel Name */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Makkah Hotel Name"
            name="makkahHotel"
            value={formik.values.makkahHotel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.makkahHotel && Boolean(formik.errors.makkahHotel)}
            helperText={formik.touched.makkahHotel && formik.errors.makkahHotel}
            required
          />
        </Grid>

        {/* Nights in Makkah */}
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
            required
          />
        </Grid>

        {/* Hotel Rating */}
        <Grid item xs={12} sm={4}>
          <Autocomplete
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
                required
              />
            )}
            fullWidth
          />
        </Grid>

        {/* Other Required Fields... */}
      </Grid>
    </LocalizationProvider>
  );
}

export default HotelDetails;
