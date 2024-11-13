import React from 'react';
import { Grid, TextField, Typography  } from '@mui/material';

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

function CustomerDetails({ formik }) {
  return (
    <div>
    <Typography variant="h6" gutterBottom>
    Customer Details
    </Typography>
    <Grid container spacing={2}>
      <FormikMuiTextField
        formik={formik}
        name="firstName"
        label="First Name"
        xs={12}
        sm={6}
      />
      <FormikMuiTextField
        formik={formik}
        name="lastName"
        label="Last Name"
        xs={12}
        sm={6}
      />
      <FormikMuiTextField
        formik={formik}
        name="email"
        label="Email"
        type="email"
        xs={12}
        sm={6}
      />
      <FormikMuiTextField
        formik={formik}
        name="phoneNumber"
        label="Phone Number"
        type="tel"
        xs={12}
        sm={6}
      />
    </Grid>
    </div>
  );
}

export default CustomerDetails;
