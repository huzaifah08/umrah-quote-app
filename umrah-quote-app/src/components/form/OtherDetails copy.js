import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Autocomplete,
} from '@mui/material';

function OtherDetails({ formik }) {
  // Options for Visa
  const visaOptions = [
    "Tourist Visa - Umrah Permitted - 1 year valid - Multiple",
    "Tourist EVW Visa - Umrah Permitted - 90 days - Single",
    "Umrah Visa - 90 days - Single",
  ];

  // Checkbox options for Transport By Road
  const transportByRoadOptions = [
    "All round",
    "Jeddah Airport to Makkah Hotel",
    "Makkah Hotel to Madinah Hotel",
    "Madinah Hotel to Madinah Airport",
    "Madinah Hotel to Jeddah Airport",
    "Makkah Hotel to Makkah Train Station",
    "Madinah Hotel to Madinah Train Station",
    "None",
  ];

  // Checkbox options for Transport By Train
  const transportByTrainOptions = [
    "All round",
    "Jeddah Airport to Makkah Hotel",
    "Makkah Hotel to Madinah Hotel",
    "Madinah Hotel to Jeddah Airport",
    "None",
  ];

  // Checkbox options for Ziaraat
  const ziaraatOptions = ["Makkah", "Madinah", "Taaif", "Badr", "None"];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Other Details
      </Typography>
      <Grid container spacing={3}>
        {/* Visa Selection */}
        <Grid item xs={12} sm={6}>
        <Autocomplete
            name="visa"
            options={visaOptions}
            freeSolo
            value={formik.values.visa || ''}
            onChange={(_, newValue) => formik.setFieldValue('visa', newValue)}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Visa"
                onBlur={formik.handleBlur}
                error={formik.touched.visa && Boolean(formik.errors.visa)}
                helperText={formik.touched.visa && formik.errors.visa}
              />
            )}
            fullWidth
          />
        </Grid>

        {/* Other Visa Type */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Other Visa Type"
            name="otherVisa"
            value={formik.values.other_visa || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otherVisa && Boolean(formik.errors.otherVisa)}
            helperText={formik.touched.otherVisa && formik.errors.otherVisa}
          />
        </Grid>

        {/* Transport By Road */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Transport By Road
          </Typography>
          <FormGroup row>
            {transportByRoadOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name="transportByRoad"
                    value={option}
                    checked={formik.values.transportByRoad?.includes(option) || false}
                    onChange={formik.handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onBlur={formik.handleBlur}
                        error={formik.touched.transportByRoad && Boolean(formik.errors.transportByRoad)}
                        helperText={formik.touched.transportByRoad && formik.errors.transportByRoad}
                      />
                    )}

                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* Transport By Bullet Train */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Transport By Bullet Train
          </Typography>
          <FormGroup row>
            {transportByTrainOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name="transportByTrain"
                    value={option}
                    checked={formik.values.transportByTrain?.includes(option) || false}
                    onChange={formik.handleChange}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* Ziaraat */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Ziaraat
          </Typography>
          <FormGroup row>
            {ziaraatOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name="ziaraat"
                    value={option}
                    checked={formik.values.ziaraat?.includes(option) || false}
                    onChange={formik.handleChange}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* Late Check-In */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="lateCheckIn"
                checked={formik.values.lateCheckIn || false}
                onChange={formik.handleChange}
              />
            }
            label="Late Check-In"
          />
        </Grid>

        {/* Other Requirements */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Other Requirements"
            name="otherInfo"
            value={formik.values.otherInfo || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default OtherDetails;
