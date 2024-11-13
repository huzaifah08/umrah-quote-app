import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Button, Autocomplete, Select, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings, DateTime } from 'luxon';

// Safely parse an ISO date string and return a valid Luxon DateTime object or null
const parseISODate = (date) => {
  return date ? DateTime.fromISO(date) : null;
};

// Set Luxon to use the UK locale globally
Settings.defaultLocale = 'en-GB'; 


const departureAirports = [
   'LHR - London Heathrow Airport',
   'LGW - London Gatwick Airport',
   'MAN - Manchester Aiport',
   'STN - Stansted Aiport',
   'BHX - Birmingham Airport',
   'LTN - London Luton Aiport',
  // ... other airports
];

const returnAirports = [
   'JED - Jeddah Airport' ,
   'MED - Madinah Airport' ,
  
  // ... other airports
];



/*const FormikMuiTextField = ({ formik, name, label, type = 'text', xs = 12, sm }) => {
  return (
    <Grid item xs={xs} sm={sm}>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        id={name}
        name={name}
        label={label}
        type={type}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        disabled={name === "totalPassengers"} // Disable the field for totalPassengers
        select={type === "select"}
        SelectProps={{ native: true }}
      >
        {type === "select" && ['Option1', 'Option2', 'Option3'].map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </TextField>
    </Grid>
  );
}; */



function FlightDetails({ formik }) {
  /*const [uploadedFile, setUploadedFile] = useState("");  // State to hold the uploaded file

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      formik.setFieldValue('flightTimeUpload', file);  // Update Formik state
    }
  }; */

 /* useEffect(() => {
      // Append file into Formik's state when it's uploaded
      if (uploadedFile) {
          formik.setFieldValue('flightTimeUpload', uploadedFile);
      }
  }, [uploadedFile, formik.setFieldValue]);
  const [uploadedFileName, setUploadedFileName] = useState(""); */



// Whenever departureDate or returnDate change, recalculate total nights
// Calculate the number of nights function
/*const calculateNights = () => {
  const startDate = formik.values.departureDate;
  const endDate = formik.values.returnDate;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end - start;
    return difference > 0 ? Math.round(difference / (1000 * 3600 * 24)) : 0;
  }
  return 0; // Return 0 by default if dates are not valid
};

// Effect hook to set total nights
useEffect(() => {
  const totalNights = calculateNights();
  formik.setFieldValue('totalNights', totalNights);
}, [formik.values.departureDate, formik.values.returnDate]); */




  return (
    <LocalizationProvider adapterLocale={'en-GB'} dateAdapter={AdapterLuxon}>
      <Typography variant="h5" gutterBottom>
        Flight Details
      </Typography>
      <Grid container spacing={2}>
        {/* First row */}
        {/*<FormikMuiTextField formik={formik} name="airline" label="Airline" xs={3} /> */}
        {/*<FormikMuiTextField formik={formik} name="flightType" label="Direct flight or indirect" xs={3} /> */}
        <Grid item xs={3}>
          {/*<Autocomplete
            id="departureAirport"
            name="departureAirport"
            options={departureAirports}
            isOptionEqualToValue={(option, value) => option === value} // Custom equality check
            value={formik.values.departureAirport || null} // Ensure a valid default value
            onChange={(event, newValue) => {
              // Ensure that the newValue is a string or null/undefined.
              // If your options are objects, you may need to extract the string value.
              formik.setFieldValue('departureAirport', newValue);
            }}
            onBlur={() => formik.setFieldTouched('departureAirport')}
            getOptionLabel={(option) => option} // if your options are just strings
            fullWidth

            renderInput={(params) => (
              <TextField 
                {...params}
                label="Departure Airport" 
                variant="outlined" 
                error={formik.touched.departureAirport && Boolean(formik.errors.departureAirport)}
                helperText={formik.touched.departureAirport && formik.errors.departureAirport}
                InputLabelProps={{ shrink: true }} // This ensures the label doesn't overlap with the value
                // You can adjust margins and padding as needed

                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          /> */}
        </Grid>

        {/* Regular dropdown for return airport */}
        <Grid item xs={3}>
        {/*<Autocomplete
            id="returnAirport"
            name="returnAirport"
            options={returnAirports}
            isOptionEqualToValue={(option, value) => option === value} // Custom equality check
            value={formik.values.returnAirport || null} // Ensure a valid default value
            onChange={(event, newValue) => {
              // Ensure that the newValue is a string or null/undefined.
              // If your options are objects, you may need to extract the string value.
              formik.setFieldValue('returnAirport', newValue);
            }}

            onBlur={() => formik.setFieldTouched('returnAirport')}
            getOptionLabel={(option) => option} // if your options are just strings

            fullWidth

            renderInput={(params) => (
              <TextField 
                {...params}
                label="ReturnAirport" 
                variant="outlined" 
                error={formik.touched.returnAirport && Boolean(formik.errors.returnAirport)}
                helperText={formik.touched.returnAirport && formik.errors.returnAirport}
                InputLabelProps={{ shrink: true }} // This ensures the label doesn't overlap with the value
                // You can adjust margins and padding as needed

                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}

          /> */}


        </Grid>

        {/* Second row */}
        {/*<Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Flight Refund Policy</FormLabel>
            <RadioGroup
              row
              name="flightRefundPolicy"
              value={formik.values.flightRefundPolicy}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="Refundable - fees apply" control={<Radio />} label="Refundable - fees apply" />
              <FormControlLabel value="Non-refundable" control={<Radio />} label="Non-refundable" />
            </RadioGroup>
          </FormControl>
        </Grid> */}

        {/* Third row */}
        {/* Departure Date and Time */}
        
        <Grid item xs={6}>
        
        {/*<DatePicker
        label="Departure Date"
        name="departureDate"
        value={formik.values.departureDate ? DateTime.fromISO(formik.values.departureDate) : null}
        onChange={(newValue) => {
          formik.setFieldValue('departureDate', newValue ? newValue.toISODate() : '');
        }}
        onBlur={() => formik.setFieldTouched('departureDate')}
        slots={{
          textField: (params) => (
            <TextField
              {...params}
              label="Departure Date"
              variant="outlined"
              fullWidth
              error={formik.touched.departureDate && Boolean(formik.errors.departureDate)}
              helperText={formik.touched.departureDate ? formik.errors.departureDate : null}
            />
          ),
        }}
        inputFormat="dd/MM/yyyy"
        fullWidth
      /> */}
        </Grid> 

        {/*<Grid item xs={6}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={16}  // Adjusted for dynamic resize
            variant="outlined"
            id="departureFlightTime"
            name="departureFlightTime"
            value={formik.values.departureFlightTime}
            onChange={(event) => formik.setFieldValue('departureFlightTime', event.target.value)}
            
            label="Departure Flight Time"
            
            InputProps={{
              style: {
                resize: 'vertical',  // Allows resizing both vertically and horizontally
                overflow: 'auto', // Adds a scrollbar if the content is larger than the element
                height: 100, //
                alignItems: 'flex-start', // Aligns the text input to the top
                paddingTop: '10px', // Adds some padding at the top if necessary
              }
            }}
            inputProps={{
              style: {
                paddingTop: '5px', // Ensures padding inside the textarea is consistent at the top
              }
            }}
            sx={{

              '& .MuiInputBase-inputMultiline': {
                alignItems: 'flex-start', // Make sure the text aligns to the top
              }
            }}
          />
      </Grid >
        
        {/* Return Date and Time */}
        <Grid item xs={6}>
        {/*<DatePicker
          label="Return Date"
          name="returnDate"
          value={formik.values.departureDate ? DateTime.fromISO(formik.values.returnDate) : null}
          onChange={(newValue) => {
            formik.setFieldValue('returnDate', newValue ? newValue.toISODate() : '');
          }}
          onBlur={() => formik.setFieldTouched('returnDate')}
          slots={{
            textField: (params) => (
              <TextField
                {...params}
                label="Return Date"
                variant="outlined"
                fullWidth
                error={formik.touched.returnDate && Boolean(formik.errors.returnDate)}
                helperText={formik.touched.returnDate ? formik.errors.returnDate : null}
              />
            ),
          }}
          inputFormat="dd/MM/yyyy"
          fullWidth
        /> */}
        </Grid>  
        {/*<Grid item xs={6}>
          <TextField
            fullWidth
            multiline
            minRows={0}
            maxRows={16}  // Adjusted for dynamic resize
            variant="outlined"
            id="returnFlightTime"
            name="returnFlightTime"
            label="Return Flight Time"
            onChange={(event) => formik.setFieldValue('returnFlightTime', event.target.value)}
            InputProps={{
              style: {
                resize: 'vertical',  // Allows resizing both vertically and horizontally
                overflow: 'auto', // Adds a scrollbar if the content is larger than the element
                height: 100, //
                alignItems: 'flex-start', // Aligns the text input to the top
                paddingTop: '10px', // Adds some padding at the top if necessary
              }
            }}
            inputProps={{
              style: {
                paddingTop: '5px', // Ensures padding inside the textarea is consistent at the top
              }
            }}
            sx={{

              '& .MuiInputBase-inputMultiline': {
                alignItems: 'flex-start', // Make sure the text aligns to the top
              }
            }}
          />
      </Grid > */}
        
        {/* File Upload */}
        <Grid item xs={12} display="flex" alignItems="center">
        {/*<Stack direction="column" spacing={2} alignItems="start">
            <Typography variant="body1">Flight Time Upload</Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ marginRight: 2 }}
            >
              Upload File
              <input
                type="file"
                name="flightTimeUpload"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </Stack>
          {uploadedFileName && (
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {uploadedFileName}
            </Typography>
          )} */}
        </Grid>

        {/* Sixth row */}
        {/*<Grid item xs={12}>
          <TextField
            fullWidth
            label="Total Nights"
            name="totalNights"
            variant="outlined"
            value={calculateNights()}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid> */}
      </Grid>
  </LocalizationProvider>
  );
}

export default FlightDetails;
