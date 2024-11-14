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

function OtherDetails({ formik }) {
  return (
    <div>
    <Typography variant="h6" gutterBottom>
    Other Details
    </Typography>

    </div>
  );
}

export default OtherDetails;
