import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

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
      />
    </Grid>
  );
};

function ConsultantDetails({ formik }) {
  return (
    <div>
    <Typography variant="h6" gutterBottom>
    Consultant Details
    </Typography>
    <Grid container spacing={2}>
      {/* Consultant Initials - Full width on its own line */}
      <FormikMuiTextField
        formik={formik}
        name="consultantInitials"
        label="Consultant Initials"
      />
      {/* Travel Consultant and Consultant Mobile - Half width each, side by side */}
      <FormikMuiTextField
        formik={formik}
        name="travelConsultant"
        label="Travel Consultant"
        xs={12}
        sm={6}
      />
      <FormikMuiTextField
        formik={formik}
        name="consultantMobile"
        label="Consultant Mobile"
        type="tel"
        xs={12}
        sm={6}
      />
    </Grid>
    </div>
  );
}

export default ConsultantDetails;
