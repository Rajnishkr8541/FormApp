//Importing the dependencies
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

//Installing the express and PORT number
const app = express();
const PORT = 3000;

//using cors and body-parser.json
app.use(cors());
app.use(bodyParser.json());

// connect database
const dB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "formapp"
});

dB.connect((err, conn) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// added the value in the databases
app.post('/api/submit', (req, res) => {
  const { fname, lname, email, phone, gender, address, city, state, zip } = req.body;

  console.log(req.body); // Log the incoming request body for debugging

  const sql = "INSERT INTO candidate (fname, lname, email, phone, gender, address, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  dB.query(sql, [fname, lname, email, phone, gender, address, city, state, zip], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error submitting form'); // Send an error response
    } else {
      console.log("User added to the database");
      res.status(200).send('User added to the database'); // Send a success response
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
