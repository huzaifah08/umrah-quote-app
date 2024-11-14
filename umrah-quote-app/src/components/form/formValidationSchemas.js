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
    airline: Yup.string().required('Airline is required'),
    flightType: Yup.string(), // Direct flight or not is not required and thus not included
    departureAirport: Yup.string().required('Departure airport is required'),
    returnAirport: Yup.string().required('Return airport is required'),
    flightRefundPolicy: Yup.string(), // Refund policy is not required
    departureDate: Yup.date()
    .nullable()
    .required('Departure date is required'), 
    departureFlightTime: Yup.string(), // Departure flight time is not required
    returnDate: Yup.date()
    .nullable()
    .required('Return date is required'), 
    returnFlightTime: Yup.string(), // Return flight time is not required
    // Assuming flightTimeUpload is the name of the field for the file upload
    flightTimeUpload: Yup.mixed(), // File upload is not required
    totalNights: Yup.number().min(1, 'There must be at least one total night').required('Total nights is required'),
  }),
  // Additional schemas for other sections can follow the same pattern

  // Hotel Details Validation
  Yup.object({
    firstDestination: Yup.string().required('First destination is required'),
    makkahHotel: Yup.string()
      .required('Makkah hotel is required'),
    nightsInMakkah: Yup.number()
      .required('Number of nights in Makkah is required')
      .positive('Number of nights must be positive')
      .min(0)
      .integer('Number of nights must be an integer'),
    makkahHotelRating: Yup.string()
      .required('Makkah hotel rating is required'),
    makkahCheckInDate: Yup.date()
      .nullable(), // Not required, allows null
    makkahCheckOutDate: Yup.date()
      .nullable(), // Not required, allows null
    makkahRoomType: Yup.string()
      .required('Makkah room type is required'),
    makkahBoardType: Yup.string()
      .required('Makkah board type is required'),
    totalRoomsMakkah: Yup.number()
      .nullable(), // Not required
    extraInfantBedsMakkah: Yup.number()
      .nullable() // Not required, default value can be handled separately in your form setup
      .default(0),
    totalBedsMakkah: Yup.number()
      .required('Total beds in Makkah are required')
      .positive('Total beds must be greater than zero')
      .integer('Total beds must be an integer'),
  }),

];

export default validationSchemas;
