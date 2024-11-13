import React, { useEffect } from 'react';
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
        disabled={name === "totalPassengers"} // Disable the field for totalPassengers
      />
    </Grid>
  );
};

function PassengerDetails({ formik }) {
  const calculateTotalPassengers = () => {
    const adults = parseInt(formik.values.adults) || 0;
    const youth = parseInt(formik.values.youth) || 0;
    const child = parseInt(formik.values.child) || 0;
    const infant = parseInt(formik.values.infant) || 0;
    return adults + youth + child + infant;
  };

  useEffect(() => {
    const total = calculateTotalPassengers();
    formik.setFieldValue('totalPassengers', total, false);
  }, [formik.values.adults, formik.values.youth, formik.values.child, formik.values.infant]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Passenger Details
      </Typography>
      <Grid container spacing={2}>
        <FormikMuiTextField
          formik={formik}
          name="adults"
          label="Adults"
          type="number"
          error={formik.touched.adults && Boolean(formik.errors.adults)}
          helperText={formik.touched.adults && formik.errors.adults}
          xs={3}
        />
        <FormikMuiTextField
          formik={formik}
          name="youth"
          label="Youth"
          type="number"
          error={formik.touched.youth && Boolean(formik.errors.youth)}
          helperText={formik.touched.youth && formik.errors.youth}
          xs={3}
        />
        <FormikMuiTextField
          formik={formik}
          name="child"
          label="Child"
          type="number"
          error={formik.touched.child && Boolean(formik.errors.child)}
          helperText={formik.touched.child && formik.errors.child}
          xs={3}
        />
        <FormikMuiTextField
          formik={formik}
          name="infant"
          label="Infant"
          type="number"
          error={formik.touched.infant && Boolean(formik.errors.infant)}
          helperText={formik.touched.infant && formik.errors.infant}
          xs={3}
        />
        <FormikMuiTextField
          formik={formik}
          name="totalPassengers"
          label="Total Passengers"
          type="text"  // Changed type to text to prevent manual edits
          value={calculateTotalPassengers()}  // Always compute on render
          error={formik.touched.totalPassengers && Boolean(formik.errors.totalPassengers)}
          helperText={formik.touched.totalPassengers && formik.errors.totalPassengers}



        />
      </Grid>
    </div>
  );
}

export default PassengerDetails;
