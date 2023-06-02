const express = require('express');
const app = new express();
const fs = require('fs');
const morgan =require('morgan');

app.use(morgan('dev'));

const jsonData = fs.readFileSync('/data.json', 'utf8');
const data = JSON.parse(jsonData);
app.get('/',(req,res)=>{
    res.send('Loading my page');
})   

// Create operation
data.push({ nameOfhospital:"CRADDLE",patientCount:400,hospitalLocation:"Kottayam" });

// Read operations
const object = data.find(item => item.nameOfhospital === 'MIMS');
console.log(object);

// Update operation
object.nameOfhospital  = 'Placeofhospital';

// Delete operation
const index = data.findIndex(item => item.patientCount  === 900);
if (index !== -1) {
  data.splice(index, 1);
}
// Write the changes back to the JSON file
const updatedJsonData = JSON.stringify(data);
fs.writeFileSync('/data.json', updatedJsonData);


 
app.listen(5000); 