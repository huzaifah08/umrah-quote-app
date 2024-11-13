import * as Yup from 'yup';

export const validationSchemas = [
  // Consultant Details Validation
  Yup.object({
    consultantInitials: Yup.string().required('Consultant initials are required'),
    travelConsultant: Yup.string().required('Travel consultant name is required'),
    consultantMobile: Yup.string()
      .matches(/^[0-9]*$/, "Only digits allowed")
      .nullable(true), // Phone number is optional and nullable
  }),
  // Customer Details Validation
  Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]*$/, "Only digits allowed")
      .nullable(true), // Phone number is optional and nullable
  }),
  // Package Details Validation
  Yup.object({
    packageIncludes: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one package option is required') // Require at least one checkbox
      .required('At least one package option is required'),
    notes: Yup.string()
      .nullable(true) // Notes are optional and can be null
  }),
  // Passenger Details Validation
  Yup.object({
    adults: Yup.number()
      .min(1, 'At least one adult must be included')
      .required('Number of adults is required'),
    youth: Yup.number(),
    child: Yup.number(),
    infant: Yup.number(),
    totalPassengers: Yup.number()
      .required('Total number of passengers is required')
      .min(1, 'There must be at least one passenger'),
  }),
  // Flight Details Validation
   Yup.object({
    //airline: Yup.string().required('Airline is required'),
    //flightType: Yup.string(), // Direct flight or not is not required and thus not included
    //departureAirport: Yup.string().required('Departure airport is required'),
    //returnAirport: Yup.string().required('Return airport is required'),
    //flightRefundPolicy: Yup.string(), // Refund policy is not required
    /*departureDate: Yup.date()
    .nullable()
    .required('Departure date is required'), */
    //departureFlightTime: Yup.string(), // Departure flight time is not required
    /*returnDate: Yup.date()
    .nullable()
    .required('Return date is required'), */
    //returnFlightTime: Yup.string(), // Return flight time is not required
    // Assuming flightTimeUpload is the name of the field for the file upload
    // flightTimeUpload: Yup.mixed(), // File upload is not required
    //totalNights: Yup.number().min(1, 'There must be at least one total night').required('Total nights is required'),
  }) 
  // Additional schemas for other sections can follow the same pattern
]; 

export default validationSchemas;
