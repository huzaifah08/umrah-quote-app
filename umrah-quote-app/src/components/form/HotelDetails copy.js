import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Typography, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Button, Divider, Autocomplete, Select } from '@mui/material';
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
//Makkah
useEffect(() => {
  // Compute the values only if they have changed
  const roomTypesString = makkahRooms.map(room => room.roomType).join(', ');
  const boardTypesString = makkahRooms.map(room => room.boardType).join(', ');

  // Only update Formik values if necessary
  if (
    formik.values.makkahRoomType !== roomTypesString ||
    formik.values.makkahBoardType !== boardTypesString ||
    formik.values.totalRoomsMakkah !== makkahRooms.length ||
    formik.values.totalBedsMakkah !== getTotalMakkahBeds()
  ) {
    formik.setFieldValue('makkahRoomType', roomTypesString);
    formik.setFieldValue('makkahBoardType', boardTypesString);
    formik.setFieldValue('totalRoomsMakkah', makkahRooms.length);
    formik.setFieldValue('totalBedsMakkah', getTotalMakkahBeds());
  }
}, [makkahRooms, formik]);
//Madinah
useEffect(() => {
  // Compute the values only if they have changed
  const roomTypesString = madinahRooms.map(room => room.roomType).join(', ');
  const boardTypesString = makkahRooms.map(room => room.boardType).join(', ');

  // Only update Formik values if necessary
  if (
    formik.values.madinahRoomType !== roomTypesString ||
    formik.values.madinahBoardType !== boardTypesString ||
    formik.values.totalRoomsMadinah !== madinahRooms.length ||
    formik.values.totalBedsMadinah !== getTotalMadinahBeds()
  ) {
    formik.setFieldValue('madinahRoomType', roomTypesString);
    formik.setFieldValue('madinahBoardType', boardTypesString);
    formik.setFieldValue('totalRoomsMadinah', madinahRooms.length);
    formik.setFieldValue('totalBedsMadinah', getTotalMadinahBeds());
  }
}, [makkahRooms, formik]);
//Makkah
const getTotalMakkahBeds = useCallback(() => {
  return makkahRooms.reduce((total, room) => {
    const roomTypeObj = roomTypes.find(rt => rt.label === room.roomType);
    return total + (roomTypeObj ? roomTypeObj.beds : 0);
  }, 0);
}, [makkahRooms]);

const getTotalMadinahBeds = useCallback(() => {
  return madinahRooms.reduce((total, room) => {
    const roomTypeObj = roomTypes.find(rt => rt.label === room.roomType);
    return total + (roomTypeObj ? roomTypeObj.beds : 0);
  }, 0);
}, [madinahRooms]);


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
  // Helper function to calculate checkout dates
  const getCheckoutDate = (checkin, nights) => {
    if (!checkin || isNaN(nights) || nights < 0) return checkin;
    const checkinDate = DateTime.fromISO(checkin);
    return checkinDate.plus({ days: Number(nights) || 0 }).toISODate();
  };

  // Effect to update Makkah checkout date
  useEffect(() => {
    const nights = Number(formik.values.nightsInMakkah) || 0;
    const makkahCheckoutDate = getCheckoutDate(formik.values.makkahCheckInDate, nights);
    if (makkahCheckoutDate !== formik.values.makkahCheckOutDate) {
      formik.setFieldValue('makkahCheckOutDate', makkahCheckoutDate);
    }
  }, [formik.values.makkahCheckInDate, formik.values.nightsInMakkah, formik]);

  // Effect to update Madinah check-in and checkout dates based on firstDestination
  useEffect(() => {
    const madinahCheckInDate =
      formik.values.firstDestination === "Makkah"
        ? formik.values.makkahCheckOutDate
        : formik.values.madinahCheckInDate;

    const nights = Number(formik.values.nightsInMadinah) || 0;
    const madinahCheckoutDate = getCheckoutDate(madinahCheckInDate, nights);

    if (formik.values.firstDestination === "Makkah") {
      if (madinahCheckInDate !== formik.values.madinahCheckInDate) {
        formik.setFieldValue('madinahCheckInDate', madinahCheckInDate);
      }
    }

    if (madinahCheckoutDate !== formik.values.madinahCheckOutDate) {
      formik.setFieldValue('madinahCheckOutDate', madinahCheckoutDate);
    }
  }, [
    formik.values.firstDestination,
    formik.values.makkahCheckOutDate,
    formik.values.madinahCheckInDate,
    formik.values.nightsInMadinah,
    formik
  ]);

  // Effect to update Makkah check-in date if Madinah is first
  useEffect(() => {
    if (formik.values.firstDestination === "Madinah") {
      const makkahCheckInDate = formik.values.madinahCheckOutDate;
      if (makkahCheckInDate !== formik.values.makkahCheckInDate) {
        formik.setFieldValue('makkahCheckInDate', makkahCheckInDate);
      }
    }
  }, [formik.values.firstDestination, formik.values.madinahCheckOutDate, formik.values.makkahCheckInDate, formik]);

  // Logic for total nights in Madinah (should be unchangeable)
  useEffect(() => {
    const totalNights = Math.max(0, formik.values.totalNights - (Number(formik.values.nightsInMakkah) || 0));
    if (formik.values.nightsInMadinah !== totalNights) {
      formik.setFieldValue('nightsInMadinah', totalNights);
    }
  }, [formik.values.totalNights, formik.values.nightsInMakkah, formik]);
  // ... include other handlers and logic
  console.log(formik.values)
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
        <Grid item xs={12}><Typography variant="h6" gutterBottom>Makkah Hotel</Typography></Grid>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
        <TextField
            fullWidth
            label="No. of Nights in Makkah"
            type="number"
            name="nightsInMakkah"
            value={formik.values.nightsInMakkah}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value) || 0);
              formik.setFieldValue('nightsInMakkah', value);
            }}
            error={formik.touched.nightsInMakkah && Boolean(formik.errors.nightsInMakkah)}
            helperText={formik.touched.nightsInMakkah && formik.errors.nightsInMakkah}
          />        
          </Grid>
        {/* Hotel Rating */}
        <Grid item xs={4}>
          <Autocomplete
            name="makkahHotelRating"
            options={hotelRatings}
            freeSolo
           
            value={formik.values.makkahHotelRating || null}
            onChange={(_, newValue) => formik.setFieldValue('makkahHotelRating', newValue)}
            isOptionEqualToValue={(option, value) => option === value}
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

       <Grid item xs={6}>
          <DatePicker
            name="makkahCheckInDate"
            label="Makkah Check In Date"
            value={formik.values.makkahCheckInDate ? DateTime.fromISO(formik.values.makkahCheckInDate) : null}
            onChange={(date) => formik.setFieldValue('makkahCheckInDate', date ? date.toISO() : '')}
            slots={{
              textField: (params) => (
              <TextField
                {...params}
                fullWidth
                name="makkahCheckInDate"
                onBlur={formik.handleBlur}
                error={formik.touched.makkahCheckInDate && Boolean(formik.errors.makkahCheckInDate)}
                helperText={formik.touched.makkahCheckInDate && formik.errors.makkahCheckInDate}
              />
            
              ),
            }}
          />
       </Grid>
        
          {/* Makkah Check Out Date - calculated based on check-in date and nights */}
        <Grid item xs={6}>
          <DatePicker
          name="makkahCheckOutDate"
          label="Makkah Check Out Date"
          value={formik.values.makkahCheckOutDate ? DateTime.fromISO(formik.values.makkahCheckOutDate) : null}
          slots={{
            textField: (params) => (
            <TextField
              {...params}
              fullWidth
              name="makkahCheckOutDate"
              onBlur={formik.handleBlur}
              error={formik.touched.makkahCheckOutDate && Boolean(formik.errors.makkahCheckOutDate)}
              helperText={formik.touched.makkahCheckOutDate && formik.errors.makkahCheckOutDate}

            />
          ),
        }}
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
                isOptionEqualToValue={(option, value) => option === value}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Makkah Room Type"
                    error={formik.touched.makkahRoomType && Boolean(formik.errors.makkahRoomType?.[index]?.roomType)}
                    helperText={formik.errors.makkahRoomType?.[index]?.roomType}
                  />
                )}
                value={roomTypes.find(rt => rt.label === room.roomType) || null}
                onChange={(_, newValue) => {
                  const newRooms = [...makkahRooms];
                  newRooms[index].roomType = newValue ? newValue.label : '';
                  setMakkahRooms(newRooms);
                }}
                fullWidth
                freeSolo
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                name="makkahBoardType"
                options={boardTypes}
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={(params) => <TextField {...params} label="Makkah Board Type" />}
                value={room.boardType || ''}
                error={formik.touched.makkahBoardType && Boolean(formik.errors.makkahBoardType)}
                helperText={formik.touched.makkahBoardType && formik.errors.makkahBoardType}
                onChange={(_, newValue) => {
                  const newRooms = [...makkahRooms];
                  newRooms[index].boardType = newValue || '';
                  setMakkahRooms(newRooms);
                  
                }}

                fullWidth
                freeSolo
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
            value={getTotalMakkahBeds()}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>

        {/* Repeat all the above for Madinah Rooms... */}
        
        {/* Madinah Hotel Section */}
        <Divider sx={{ my: 8 }} />
        <Grid item xs={12}><Typography variant="h6" gutterBottom>Madinah Hotel</Typography></Grid>
        <Grid item xs={12} sm={4}>
        <TextField
            fullWidth
            label="Madinah Hotel Name"
            name="madinahHotel"
            value={formik.values.madinahHotel}
            onChange={formik.handleChange}
            //onBlur={formik.handleBlur}
            error={formik.touched.madinahHotel && Boolean(formik.errors.madinahHotel)}
            helperText={formik.touched.madinahHotel && formik.errors.madinahHotel}
         
          />        
          </Grid>
        <Grid item xs={6} sm={4}>
        <TextField
            fullWidth
            label="No. of Nights in Madinah"
            type="number"
            name="nightsInMadinah"
            value={formik.values.nightsInMadinah}
            InputProps={{ readOnly: true }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nightsInMadinah && Boolean(formik.errors.nightsInMadinah)}
            helperText={formik.touched.nightsInMadinah && formik.errors.nightsInMadinah}
          />        
          </Grid>
        {/* Hotel Rating */}
        <Grid item xs={12} sm={4}>
          <Autocomplete
            name="madinahHotelRating"
            options={hotelRatings}
            isOptionEqualToValue={(option, value) => option === value}
            value={formik.values.madinahHotelRating || null}
            onChange={(_, newValue) => formik.setFieldValue('madinahHotelRating', newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Madinah Hotel Rating"
                onBlur={formik.handleBlur}
                error={formik.touched.madinahHotelRating && Boolean(formik.errors.madinahHotelRating)}
                helperText={formik.touched.madinahHotelRating && formik.errors.madinahHotelRating}
              />
            )}
            fullWidth
            freeSolo
          />
        </Grid>

        {/* Madinah Check-in and Check-out Dates */}
        <Grid item xs={12} sm={6}>
        <DatePicker
          name="madinahCheckInDate"
          label="Madinah Check In Date"
          value={formik.values.madinahCheckInDate ? DateTime.fromISO(formik.values.madinahCheckInDate) : null}
          onChange={(date) => formik.setFieldValue('madinahCheckInDate', date ? date.toISO() : '')}
          slots={{
            textField: (params) => (
            <TextField
              {...params}
              fullWidth
              name="madinahCheckIntDate"
              onBlur={formik.handleBlur}
              error={formik.touched.madinahCheckInDate && Boolean(formik.errors.madinahCheckInDate)}
              helperText={formik.touched.madinahCheckInDate && formik.errors.madinahCheckInDate}
              //disabled
            />
          ),
        }}
          fullWidth
        />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Madinah Check Out Date - calculated based on check-in date and nights */}
          <DatePicker
          name="madinahCheckOutDate"
          label="Madinah Check Out Date"
          value={formik.values.madinahCheckOutDate ? DateTime.fromISO(formik.values.madinahCheckOutDate) : null}
          slots={{
            textField: (params) => (
            <TextField
              {...params}
              fullWidth
              name="madinahCheckOutDate"
              onBlur={formik.handleBlur}
              error={formik.touched.madinahCheckOutDate && Boolean(formik.errors.madinahCheckOutDate)}
              helperText={formik.touched.madinahCheckOutDate && formik.errors.madinahCheckOutDate}
              //disabled
            />
          ),
        }}
          
        />
        </Grid>

        {/* Madinah Hotel Refund Policy */}
        <Grid item xs={12}>
          {/* ... include RadioGroup for refund policy here */}
        </Grid>

        {/* Madinah Rooms */}
        {madinahRooms.map((room, index) => (
          <React.Fragment key={index}>
            <RoomDivider title={`Room ${index + 1}`} />
            <Grid item xs={6}>
              <Autocomplete
                name="madinahRoomType"
                options={roomTypes}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={(params) => <TextField {...params} label="Madinah Room Type" />}
                value={roomTypes.find(rt => rt.label === room.roomType) || null}
                onChange={(_, newValue) => {
                  const newRooms = [...madinahRooms];
                  newRooms[index].roomType = newValue ? newValue.label : '';
                  setMadinahRooms(newRooms);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.madinahRoomType && Boolean(formik.errors.madinahRoomType)}
                helperText={formik.touched.madinahRoomType && formik.errors.madinahRoomType}
                fullWidth
                freeSolo
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={boardTypes}
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={(params) => <TextField {...params} label="Madinah Board Type" />}
                value={room.boardType || ''}
                onChange={(_, newValue) => {
                  const newRooms = [...madinahRooms];
                  newRooms[index].boardType = newValue || '';
                  setMadinahRooms(newRooms);
                }}
                fullWidth
                freeSolo
                
              />
              
            </Grid>

            {madinahRooms.length > 1 && (
              <Grid item xs={12}>
                <Button onClick={() => removeRoom(setMadinahRooms, index)}>Remove Room</Button>
              </Grid>
            
            )}
          </React.Fragment>
        ))}
        <Grid item xs={12}>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => addRoom(setMadinahRooms)}>Add Room</Button>
        </Grid>

        {/* Room counts */}
        <Grid item xs={4}>
          <TextField
            name="totalRoomsMadinah"
            label="Total Rooms in Madinah"
            type="number"
            value={madinahRooms.length}
            InputProps={{
              readOnly: true,
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.madinahBoardType && Boolean(formik.errors.madinahBoardType)}
            helperText={formik.touched.madinahBoardType && formik.errors.madinahBoardType}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="No. of extra infant beds in Madinah"
            type="number"
            value={formik.values.extraInfantBedsMadinah}
            onChange={formik.handleChange}
            name="extraInfantBedsMadinah"
            onBlur={formik.handleBlur}
            error={formik.touched.extraInfantBedsMadinah && Boolean(formik.errors.extraInfantBedsMadinah)}
            helperText={formik.touched.extraInfantBedsMadinah && formik.errors.extraInfantBedsMadinah}            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            name="totalBedsMadinah"
            label="Total Beds in Madinah"
            type="number"
            value={getTotalMadinahBeds()}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>



      
      

    </Grid>
    </LocalizationProvider>
    
  );
}

export default HotelDetails;
