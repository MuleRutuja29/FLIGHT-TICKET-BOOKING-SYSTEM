const express = require('express');
const app = express();
const fs = require('fs')
const port =  3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const FlightDetails = require('./Model/flightDetails');
// Create an instance of the FlightDetails class
const flightDetails = new FlightDetails();

const UserDetails = require('./Model/User');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Read the JSON data from file with utf-8 encoding
const countryData = JSON.parse(fs.readFileSync('./Json-data/getCountry.json', 'utf8'));

app.get('/countryList', (req, res) => {
  // Send the JSON data
  res.json(countryData);
});

// POST endpoint to handle user input
app.post('/flights', (req, res) => {
    const {
        tripType,
        sourceId,
        destinationId,
        departureDate,
        arrivalDate,
        adultCount,
        childrenCount,
        flightClass
    } = req.body;

    const flightAvailabilityResult = flightDetails.checkFlightAvailable(tripType,sourceId,destinationId,departureDate,arrivalDate,
        adultCount,
        childrenCount,
        flightClass
        );
     console.log("flightAvailabilityResult",flightAvailabilityResult); 
        
    if(Array.isArray(flightAvailabilityResult)){
        res.status(200).json(flightAvailabilityResult);
    }
    else{
        res.status(404).json(flightAvailabilityResult);
    }   
  });

  //booking Submit api 

  app.post('/bookFlight', (req, res) => {
    // Store the received payload as the response
    const responseData = req.body;

    // Log the received payload for debugging
    console.log("Received payload:", responseData);

    // Respond back with the received payload
    res.status(200).json(responseData);
});


// const users = [];
app.post('/createUser', (req, res) => {
  const creds = req.body; // Directly access the body as creds
  console.log('Current UserDetails:', UserDetails); // Debug log
  console.log('Received creds:', creds); // Debug log

  // Push the new user credentials into the UserDetails array
  UserDetails.push(creds);

  console.log('Updated UserDetails:', UserDetails); // Debug log
  res.status(200).json({ message: 'User registered successfully' });
 });

// app.post('/login', (req, res) => {
//   const { creds } = req.body;
//   if (!creds) {
//     return res.status(400).json({ message: 'Missing credentials' });
//   }

//   console.log("creds", creds);
//   const user = users.find((user) => user.email === creds.email && user.password === creds.password);
//   if (user) {
//     const payload = {
//       email: user.email,
//       iat: Math.floor(Date.now() / 1000),
//       role: 'user',
//     };
//     const token = jwt.sign(payload, 'your_jwt_secret'); // Use a secure secret
//     res.status(200).json({ message: 'Login successful', token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = UserDetails.find((user) => user.email === email && user.password === password);
  console.log("CHECK USER",user);
  if (user){
    const payload = {
      email: email,
      password:password,
      iat: Math.floor(Date.now() / 1000),
      role: 'user',
  };
    const token = jwt.sign(payload,'123');
    res.status(200).json({ message: 'Login successful', token:token });
  }else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware for authentication
app.use((req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);  
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token,'123');
    req.user = decoded;
    console.log("decoded" + decoded);
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
});