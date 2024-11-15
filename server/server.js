const mysql2 = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const winston = require('winston');
const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = crypto.randomBytes(32).toString('hex');
console.log('Generated JWT Secret:', JWT_SECRET);

const db = mysql2.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'umrahquotedb',
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Database connected successfully!');
  connection.release();
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Lookup the user in the database
    const [rows] = await db.query('SELECT id, username, password_hash FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];

    // Compare submitted password with stored password hash
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    console.log('Generated JWT:', token); // Log the generated token
    res.json({ token });

  

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // the number 10 here is the salt rounds
  
      // Insert the new user into the database
      // (You should also check if the user already exists and handle that accordingly)
      const [result] = await db.query('INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
  
      res.status(201).json({ message: 'User created!', userId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


app.post('/submit-quote', upload.single('flightTimeUpload'), async (req, res) => {
  console.log(req.body)
    const { 
      // Destructure your form fields here
      consultantInitials,
      travelConsultant,
      consultantMobile,
      firstName,
      lastName,
      email,
      phoneNumber,
      packageIncludes,
      notes,
      adults,
      youth,
      child,
      infant,
      totalPassengers,
      airline,
      flightType,
      departureAirport,
      returnAirport,
      flightRefundPolicy,
      departureDate,
      departureFlightTime,
      returnDate,
      returnFlightTime,
      flightTimeUpload,
      totalNights,
      firstDestination,
      makkahHotel,
      nightsInMakkah,
      makkahHotelRating,
      makkahCheckInDate,
      makkahCheckOutDate,
      makkahRoomType,
      makkahBoardType,
      makkahRoomCount,
      totalRoomsMakkah,
      extraInfantBedsMakkah,
      totalBedsMakkah,
      madinahHotel,
      nightsInMadinah,
      madinahHotelRating,
      madinahCheckInDate,
      madinahCheckOutDate,
      madinahRoomType,
      madinahBoardType,
      madinahRoomCount,
      totalRoomsMadinah,
      extraInfantBedsMadinah,
      totalBedsMadinah,
      visa,
      otherVisa,
      transportByRoad,
      transportByTrain,
      ziaraat,
      lateCheckIn,
      otherInfo,
      flightRateAdult,
      flightRateYouth,
      flightRateChild,
      flightRateInfant,
      flightTotal,
      makkahRoomRates,
      totalMakkahRoomCost,
      totalMakkahRoomCostPP,
      madinahRoomRates,
      totalMadinahRoomCost,
      totalMadinahRoomCostPP,
      averageBeds,
      totalMinusFlightsPP,
      totalHotelsCost,
      totalHotelsCostPP,
      extraInfantBedCost,
      visaCostPP,
      transportZiaraathCostPP,
      trainCostPP,
      totalVisaCost,
      totalTransportZiaraathCost,
      totalTrainCost,
      localGuideCost,
      profitPP,
      totalProfit,
      adultPricePP,
      youthPricePP,
      childPricePP,
      infantPricePP,
      grandTotal,
      totalPP,
      // Include all other fields from your form
    } = req.body;
    
    const flightTimeUploadPath = req.file ? req.file.path : ''; // This will be the path to the file on your server
    try {
      const [result] = await db.query('INSERT INTO umrah_quotes SET ?', {
        consultant_initials: consultantInitials,
        travel_consultant: travelConsultant,
        consultant_mobile: consultantMobile,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        package_includes: packageIncludes,
        notes: notes,
        adults: adults,
        youth: youth,
        child: child,
        infant: infant,
        total_passengers: totalPassengers,
        airline: airline,
        flight_type: flightType,
        departure_airport: departureAirport,
        return_airport: returnAirport,
        flight_refund_policy: flightRefundPolicy,
        departure_date: departureDate,
        departure_flight_time: departureFlightTime,
        return_date: returnDate,
        return_flight_time: returnFlightTime,
        flight_time_upload: flightTimeUploadPath,
        total_nights: totalNights,
        first_destination: firstDestination,
        makkah_hotel: makkahHotel,
        nights_in_makkah: nightsInMakkah,
        makkah_hotel_rating: makkahHotelRating,
        makkah_check_in_date: makkahCheckInDate,
        makkah_check_out_date: makkahCheckOutDate,
        makkah_room_type: makkahRoomType,
        makkah_board_type: makkahBoardType,
        total_rooms_makkah: totalRoomsMakkah,
        extra_infant_beds_makkah: extraInfantBedsMakkah,
        total_beds_makkah: totalBedsMakkah,
        madinah_hotel: madinahHotel,
        nights_in_madinah: nightsInMadinah,
        madinah_hotel_rating: madinahHotelRating,
        madinah_check_in_date: madinahCheckInDate,
        madinah_check_out_date: madinahCheckOutDate,
        madinah_room_type: madinahRoomType,
        madinah_board_type: madinahBoardType,
        total_rooms_madinah: totalRoomsMadinah,
        extra_infant_beds_madinah: extraInfantBedsMadinah,
        total_beds_madinah: totalBedsMadinah,
        visa: visa,
        other_visa: otherVisa,
        transport_by_road: transportByRoad,
        transport_by_train: transportByTrain,
        ziaraat: ziaraat,
        late_check_in: lateCheckIn,
        other_info: otherInfo,
        flight_rate_adult: flightRateAdult,
        flight_rate_youth: flightRateYouth,
        flight_rate_child: flightRateChild,
        flight_rate_infant: flightRateInfant,
        flight_total: flightTotal,
        makkah_room_rates: makkahRoomRates,
        total_makkah_room_cost: totalMakkahRoomCost,
        total_makkah_room_cost_pp: totalMakkahRoomCostPP,
        madinah_room_rates: madinahRoomRates,
        total_madinah_room_cost: totalMadinahRoomCost,
        total_madinah_room_cost_pp: totalMadinahRoomCostPP,
        average_beds: averageBeds,
        total_minus_flights_pp: totalMinusFlightsPP,
        total_hotels_cost: totalHotelsCost,
        total_hotels_cost_pp: totalHotelsCostPP,
        extra_infant_bed_cost: extraInfantBedCost,
        visa_cost_pp: visaCostPP,
        transport_ziaraath_cost_pp: transportZiaraathCostPP,
        train_cost_pp: trainCostPP,
        total_visa_cost: totalVisaCost,
        total_transport_ziaraath_cost: totalTransportZiaraathCost,
        total_train_cost: totalTrainCost,
        local_guide_cost: localGuideCost,
        profit_pp: profitPP,
        total_profit: totalProfit,
        adult_price_pp: adultPricePP,
        youth_price_pp: youthPricePP,
        child_price_pp: childPricePP,
        infant_price_pp: infantPricePP,
        grand_total: grandTotal,
        total_pp: totalPP,
        // Map the rest of your form fields to the database columns
      });

      const newQuoteId = result.insertId; // Get the ID of the newly created quote
      // Now, store the initial version in the quote_versions table
      await db.query('INSERT INTO quote_versions (quote_id, version_data) VALUES (?, ?)', [
      newQuoteId,
      JSON.stringify({
        quote_accepted: false, // Since it's a new quote, default to false
        consultant_initials: consultantInitials,
        travel_consultant: travelConsultant,
        consultant_mobile: consultantMobile,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        package_includes: packageIncludes,
        notes: notes,
        adults: adults,
        youth: youth,
        child: child,
        infant: infant,
        total_passengers: totalPassengers,
        airline: airline,
        flight_type: flightType,
        departure_airport: departureAirport,
        return_airport: returnAirport,
        flight_refund_policy: flightRefundPolicy,
        departure_date: departureDate,
        departure_flight_time: departureFlightTime,
        return_date: returnDate,
        return_flight_time: returnFlightTime,
        flight_time_upload: flightTimeUploadPath,
        total_nights: totalNights,
        first_destination: firstDestination,
        makkah_hotel: makkahHotel,
        nights_in_makkah: nightsInMakkah,
        makkah_hotel_rating: makkahHotelRating,
        makkah_check_in_date: makkahCheckInDate,
        makkah_check_out_date: makkahCheckOutDate,
        makkah_room_type: makkahRoomType,
        makkah_board_type: makkahBoardType,
        total_rooms_makkah: totalRoomsMakkah,
        extra_infant_beds_makkah: extraInfantBedsMakkah,
        total_beds_makkah: totalBedsMakkah,
        madinah_hotel: madinahHotel,
        nights_in_madinah: nightsInMadinah,
        madinah_hotel_rating: madinahHotelRating,
        madinah_check_in_date: madinahCheckInDate,
        madinah_check_out_date: madinahCheckOutDate,
        madinah_room_type: madinahRoomType,
        madinah_board_type: madinahBoardType,
        total_rooms_madinah: totalRoomsMadinah,
        extra_infant_beds_madinah: extraInfantBedsMadinah,
        total_beds_madinah: totalBedsMadinah,
        visa: visa,
        other_visa: otherVisa,
        transport_by_road: transportByRoad,
        transport_by_train: transportByTrain,
        ziaraat: ziaraat,
        late_check_in: lateCheckIn,
        other_info: otherInfo,
        flight_rate_adult: flightRateAdult,
        flight_rate_youth: flightRateYouth,
        flight_rate_child: flightRateChild,
        flight_rate_infant: flightRateInfant,
        flight_total: flightTotal,
        makkah_room_rates: makkahRoomRates,
        total_makkah_room_cost: totalMakkahRoomCost,
        total_makkah_room_cost_pp: totalMakkahRoomCostPP,
        madinah_room_rates: madinahRoomRates,
        total_madinah_room_cost: totalMadinahRoomCost,
        total_madinah_room_cost_pp: totalMadinahRoomCostPP,
        average_beds: averageBeds,
        total_minus_flights_pp: totalMinusFlightsPP,
        total_hotels_cost: totalHotelsCost,
        total_hotels_cost_pp: totalHotelsCostPP,
        extra_infant_bed_cost: extraInfantBedCost,
        visa_cost_pp: visaCostPP,
        transport_ziaraath_cost_pp: transportZiaraathCostPP,
        train_cost_pp: trainCostPP,
        total_visa_cost: totalVisaCost,
        total_transport_ziaraath_cost: totalTransportZiaraathCost,
        total_train_cost: totalTrainCost,
        local_guide_cost: localGuideCost,
        profit_pp: profitPP,
        total_profit: totalProfit,
        adult_price_pp: adultPricePP,
        youth_price_pp: youthPricePP,
        child_price_pp: childPricePP,
        infant_price_pp: infantPricePP,
        grand_total: grandTotal,
        total_pp: totalPP,
      }),
    ]);
      res.status(201).json({ message: 'Quote submitted!', id: result.insertId });
    } catch (error) {
      console.error('Failed to submit quote:', error.message);
      res.status(500).json({ message: error.message });
    }
  });
  

app.patch('/update-quote-status/:id', async (req, res) => {
    const { id } = req.params;
    const { quoteAccepted } = req.body;
  
    try {
      await db.query('UPDATE umrah_quotes SET quote_accepted = ? WHERE id = ?', [quoteAccepted, id]);
      res.json({ message: 'Quote updated successfully.' });
    } catch (error) {
      console.error('Failed to update quote status:', error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// Define a route handler for login
app.get('/login', (req, res) => {
  res.send('Login page');
});

// Define a route handler for register
app.get('/register', (req, res) => {
  res.send('Register page');
});

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the log level
  format: winston.format.simple(), // Set the log format
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'server.log' }) // Log to a file
  ],
});

app.get('/umrah-quotes', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, quote_accepted, consultant_initials, first_name, last_name, email, phone_number, departure_date, return_date, total_nights, grand_total, created_at FROM umrah_quotes'
    );
    res.json(rows); // Send the rows as JSON
  } catch (error) {
    console.error('Failed to fetch quotes:', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/quote/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM umrah_quotes WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Failed to fetch quote:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.patch('/update-quote/:id', async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    // Fetch the current quote data
    const [currentQuoteRows] = await db.query('SELECT * FROM umrah_quotes WHERE id = ?', [id]);
    if (currentQuoteRows.length === 0) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    const currentQuote = currentQuoteRows[0];

    // Save the current quote data as a version before updating
    await db.query('INSERT INTO quote_versions (quote_id, version_data) VALUES (?, ?)', [
      id,
      JSON.stringify(currentQuote),
    ]);

    // Update the quote with the new data
    await db.query('UPDATE umrah_quotes SET ? WHERE id = ?', [updatedFields, id]);

    res.json({ message: 'Quote updated successfully and version saved.' });
  } catch (error) {
    console.error('Failed to update quote:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to Get Version History for a Quote
app.get('/quote-versions/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [versions] = await db.query(
      'SELECT version_id, version_data, created_at FROM quote_versions WHERE quote_id = ? ORDER BY created_at DESC',
      [id]
    );
    res.json(versions);
  } catch (error) {
    console.error('Failed to fetch version history:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to Restore a Previous Version
app.post('/restore-quote-version/:id', async (req, res) => {
  const { id } = req.params;
  const { version_id } = req.body;

  try {
    // Fetch the version data
    const [versionRows] = await db.query('SELECT version_data FROM quote_versions WHERE version_id = ?', [version_id]);
    if (versionRows.length === 0) {
      return res.status(404).json({ message: 'Version not found' });
    }

    const versionData = JSON.parse(versionRows[0].version_data);

    // Restore the quote with the version data
    await db.query('UPDATE umrah_quotes SET ? WHERE id = ?', [versionData, id]);

    res.json({ message: 'Quote restored to the selected version.' });
  } catch (error) {
    console.error('Failed to restore quote version:', error.message);
    res.status(500).json({ message: error.message });
  }
});

  








app.post('/submit-date', async (req, res) => {
  const { selectedDate } = req.body;

  try {
    if (!selectedDate) {
      return res.status(400).json({ message: 'Date is required' });
    }

    // Insert the date into the test table
    await db.query('INSERT INTO date_test (selected_date) VALUES (?)', [selectedDate]);

    res.status(201).json({ message: 'Date saved successfully' });
  } catch (error) {
    console.error('Failed to save date:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});





app.post('/submit-flight-details', async (req, res) => {

  console.log(req.body);
  
  const {
    airline,
    flightType, // Make sure to provide this value
    departureDate,
    returnDate,
    departureAirport,
    returnAirport,
    departureFlightTime = null, // Optional, can be null
    returnFlightTime = null, // Optional, can be null
    flightRefundPolicy = null, // Optional, can be null
    totalNights,
  } = req.body;

  // Check for required fields
  if (
    !airline ||
    !flightType ||
    !departureDate ||
    !returnDate ||
    !departureAirport ||
    !returnAirport ||
    totalNights === undefined
  ) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO flight_details (
        airline,
        flight_type,
        departure_date,
        return_date,
        departure_airport,
        return_airport,
        departure_flight_time,
        return_flight_time,
        flight_refund_policy,
        total_nights
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        airline,
        flightType,
        departureDate,
        returnDate,
        departureAirport,
        returnAirport,
        departureFlightTime,
        returnFlightTime,
        flightRefundPolicy,
        totalNights,
      ]
    );

    res.status(201).json({ message: 'Flight details saved successfully!', id: result.insertId });
  } catch (error) {
    console.error('Failed to save flight details:', error.message);
    res.status(500).json({ message: 'Failed to save flight details' });
  }
});






// Start the server
const PORT = 3001; // Your server's port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
