import React from 'react';
import { Checkbox, FormControlLabel, Grid, Typography, TextField } from '@mui/material';

import 'react-resizable/css/styles.css';

function PackageDetails({ formik }) {
  // Helper function to toggle checkbox values
  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const currentValues = formik.values.packageIncludes || [];
    if (checked && !currentValues.includes(name)) {
      formik.setFieldValue('packageIncludes', [...currentValues, name]);
    } else {
      formik.setFieldValue('packageIncludes', currentValues.filter(item => item !== name));
    }
    
  };


  

  
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Package Details
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4} md={1.3}>
          <FormControlLabel
            error={formik.touched.packageIncludes && Boolean(formik.errors.packageIncludes)}
            helperText={formik.touched.packageIncludes && formik.errors.packageIncludes}
            control={
              <Checkbox
                name="Flights"
                checked={formik.values.packageIncludes?.includes('Flights') || false}
                onChange={handleCheckboxChange}
                error={formik.touched.Flights && Boolean(formik.errors.Flights)}
                helperText={formik.touched.child && formik.errors.child}
              />
            }
            label="Flights"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={1.3}>
          {/* Repeat for other checkboxes */}
          <FormControlLabel
            control={
              <Checkbox
                name="Hotels"
                checked={formik.values.packageIncludes?.includes('Hotels') || false}
                onChange={handleCheckboxChange}

              />
            }
            label="Hotels"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={1.1}>
          {/* Repeat for other checkboxes */}
          <FormControlLabel
            control={
              <Checkbox
                name="Visa"
                checked={formik.values.packageIncludes?.includes('Visa') || false}
                onChange={handleCheckboxChange}
              />
            }
            label="Visa"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={1.5}>
          {/* Repeat for other checkboxes */}
          <FormControlLabel
            control={
              <Checkbox
                name="Transport"
                checked={formik.values.packageIncludes?.includes('Transport') || false}
                onChange={handleCheckboxChange}
              />
            }
            label="Transport"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={1.3}>
          {/* Repeat for other checkboxes */}
          <FormControlLabel
            control={
              <Checkbox
                name="Ziaraat"
                checked={formik.values.packageIncludes?.includes('Ziaraat') || false}
                onChange={handleCheckboxChange}
              />
            }
            label="Ziaraat"
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          {/* Repeat for other checkboxes */}
          <FormControlLabel
            control={
              <Checkbox
                name="Local Guide"
                checked={formik.values.packageIncludes?.includes('Local Guide') || false}
                onChange={handleCheckboxChange}
              />
            }
            label="Local Guide"
          />
        </Grid>
        {/* Repeat Grid items for the rest of the checkboxes */}
        {/* ... */}
      </Grid>
      <Grid>


        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={16}  // Adjusted for dynamic resize
          variant="outlined"
          id="notes"
          name="notes"
          label="Additional Notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
          InputProps={{
            style: {
              resize: 'vertical',  // Allows resizing both vertically and horizontally
              overflow: 'auto', // Adds a scrollbar if the content is larger than the element
              height: 100, //
            }
          }}
          sx={{
            '& .MuiInputBase-root': {
              overflow: 'hidden' // Ensures the TextField container does not scroll
            }
          }}
        />

      </Grid>
    </div>
  );
}

export default PackageDetails;
