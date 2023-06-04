const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
const PORT=process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());

// Read hospitals data from JSON file
const readHospitalsData = () => {
    const rawData = fs.readFileSync('hospitals.json');
    return JSON.parse(rawData);
  };
  
  // Write hospitals data to JSON file
const writeHospitalsData = (data) => {
    fs.writeFileSync('hospitals.json', JSON.stringify(data, null, 2));
  };

// GET all hospitals
app.get('/hospitals', (req, res) => {
    const hospitals = readHospitalsData();
    res.json(hospitals);
  });


  // GET a specific hospital by index
app.get('/hospitals/:index', (req, res) => {
    const hospitals = readHospitalsData();
    const index = req.params.index;
    if (index < hospitals.length) {
      res.json(hospitals[index]);
    } else {
      res.status(404).send('Hospital not found.');
    }
  });
  

  // POST a new hospital
app.post('/hospitals', (req, res) => {
    const hospitals = readHospitalsData();
    const newHospital = req.body;
    hospitals.push(newHospital);
    writeHospitalsData(hospitals);
    res.send('Hospital added successfully.');
  });

  // PUT (update) a hospital by index
app.put('/hospitals/:index', (req, res) => {
    const hospitals = readHospitalsData();
    const index = req.params.index;
    if (index < hospitals.length) {
      hospitals[index] = req.body;
      writeHospitalsData(hospitals);
      res.send('Hospital updated successfully.');
    } else {
      res.status(404).send('Hospital not found.');
    }
  });
  

  // DELETE a hospital by index
app.delete('/hospitals/:index', (req, res) => {
    const hospitals = readHospitalsData();
    const index = req.params.index;
    if (index < hospitals.length) {
      hospitals.splice(index, 1);
      writeHospitalsData(hospitals);
      res.send('Hospital deleted successfully.');
    } else {
      res.status(404).send('Hospital not found.');
    }
  });

  // Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });