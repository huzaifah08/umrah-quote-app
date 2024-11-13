import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Button, Autocomplete, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Settings, DateTime } from 'luxon';


// Set Luxon to use the UK locale globally
Settings.defaultLocale = 'en-GB';

const FormikMuiTextField = ({ formik, name, label, type = 'text', xs = 12, sm }) => {
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
  };


  return (
    
  <LocalizationProvider dateAdapter={AdapterLuxon}>


  <Grid item xs={6}>
  <DatePicker
    label="Departure Date"
    name="departureDate"

    value={formik.values.departureDate ? DateTime.fromISO(formik.values.departureDate) : null}
    onChange={(newValue) => {
      formik.setFieldValue('departureDate', newValue ? newValue.toISO() : '');
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        value={params.inputProps.value ? DateTime.fromISO(params.inputProps.value).toFormat('dd/MM/yyyy') : ''}
      />
    )}
    inputFormat="dd/MM/yyyy"

    fullWidth // Make the DatePicker full width
  />
</Grid>
</LocalizationProvider>
)