import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Button, Autocomplete, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings, DateTime } from 'luxon';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Set Luxon to use the UK locale
DateTime.local().setLocale('en-GB');

Settings.defaultLocale = 'en-GB'; 
Settings.defaultZone = 'utc';
const departureAirports = [
  'LHR - London Heathrow Airport',
  'LGW - London Gatwick Airport',
  'MAN - Manchester Airport',
  'STN - Stansted Airport',
  'BHX - Birmingham Airport',
  'LTN - London Luton Airport',
];

const returnAirports = [
  'JED - Jeddah Airport',
  'MED - Madinah Airport',
];

// Validation schema using Yup
const validationSchema = Yup.object({
  airline: Yup.string().required('Airline is required'),
  flightType: Yup.string().required('Flight type is required'),
  departureDate: Yup.date().nullable().required('Departure date is required'),
  returnDate: Yup.date().nullable().required('Return date is required'),
  departureAirport: Yup.string().required('Departure airport is required'),
  returnAirport: Yup.string().required('Return airport is required'),
});

function FlightDetails() {


  const formik = useFormik({
    initialValues: {
      airline: '',
      flightType: '',
      departureDate: null,
      returnDate: null,
      departureAirport: '',
      returnAirport: '',
      departureFlightTime: '',
      returnFlightTime: '',
      flightRefundPolicy: '',
      totalNights: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3001/submit-flight-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert('Flight details saved successfully!');
          formik.resetForm();
        } else {
          alert('Failed to save flight details');
        }
      } catch (error) {
        console.error('Error submitting flight details:', error);
        alert('Error submitting flight details');
      }
    },
  });
  // Calculate total nights between departure and return dates
  useEffect(() => {
    const { departureDate, returnDate } = formik.values;
    if (departureDate && returnDate) {
      const start = DateTime.fromISO(departureDate);
      const end = DateTime.fromISO(returnDate);
      const nights = end.diff(start, 'days').days;
      formik.setFieldValue('totalNights', Math.max(0, Math.floor(nights)));
    }
  }, [formik.values.departureDate, formik.values.returnDate]);



  return (
    <LocalizationProvider adapterLocale={'en-GB'} dateAdapter={AdapterLuxon}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Flight Details
        </Typography>
        <Grid container spacing={2}>
          {/* Airline and Flight Type */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Airline"
              name="airline"
              value={formik.values.airline}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.airline && Boolean(formik.errors.airline)}
              helperText={formik.touched.airline && formik.errors.airline}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            fullWidth
            label="Flight Type"
            name="flightType"
            value={formik.values.flightType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            required // Add 'required' to indicate this field is necessary
          />
        </Grid>

          {/* Departure and Return Airports */}
          <Grid item xs={6}>
            <Autocomplete
              options={departureAirports}
              value={formik.values.departureAirport || ''}
              onChange={(event, newValue) => formik.setFieldValue('departureAirport', newValue)}
              onBlur={() => formik.setFieldTouched('departureAirport')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Departure Airport"
                  variant="outlined"
                  fullWidth
                  error={formik.touched.departureAirport && Boolean(formik.errors.departureAirport)}
                  helperText={formik.touched.departureAirport && formik.errors.departureAirport}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={returnAirports}
              value={formik.values.returnAirport || ''}
              onChange={(event, newValue) => formik.setFieldValue('returnAirport', newValue)}
              onBlur={() => formik.setFieldTouched('returnAirport')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Return Airport"
                  variant="outlined"
                  fullWidth
                  error={formik.touched.returnAirport && Boolean(formik.errors.returnAirport)}
                  helperText={formik.touched.returnAirport && formik.errors.returnAirport}
                />
              )}
            />
          </Grid>

          {/* Flight Refund Policy */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Flight Refund Policy</FormLabel>
              <RadioGroup
                row
                name="flightRefundPolicy"
                value={formik.values.flightRefundPolicy}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="Refundable" control={<Radio />} label="Refundable" />
                <FormControlLabel value="Non-refundable" control={<Radio />} label="Non-refundable" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Departure and Return Dates */}
          <Grid item xs={6}>
            <DatePicker
              label="Departure Date"
              value={formik.values.departureDate ? DateTime.fromISO(formik.values.departureDate) : null}
              onChange={(newValue) => formik.setFieldValue('departureDate', newValue ? newValue.toISODate() : '')}
              onBlur={() => formik.setFieldTouched('departureDate')}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    label="Departure Date"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.departureDate && Boolean(formik.errors.departureDate)}
                    helperText={formik.touched.departureDate && formik.errors.departureDate}
                  />
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Return Date"
              value={formik.values.returnDate ? DateTime.fromISO(formik.values.returnDate) : null}
              onChange={(newValue) => formik.setFieldValue('returnDate', newValue ? newValue.toISODate() : '')}
              onBlur={() => formik.setFieldTouched('returnDate')}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    label="Return Date"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.returnDate && Boolean(formik.errors.returnDate)}
                    helperText={formik.touched.returnDate && formik.errors.returnDate}
                  />
                ),
              }}
            />
          </Grid>

          {/* Departure and Return Flight Times */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Departure Flight Time"
              name="departureFlightTime"
              value={formik.values.departureFlightTime}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Return Flight Time"
              name="returnFlightTime"
              value={formik.values.returnFlightTime}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Total Nights */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Total Nights"
              name="totalNights"
              variant="outlined"
              value={formik.values.totalNights}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
}

export default FlightDetails;
