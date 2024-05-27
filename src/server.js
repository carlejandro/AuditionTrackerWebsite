// This sets up an Express server that connects to a MongoDB database using Mongoose, 
// defines a schema and model, and provides routes to interact with the data.


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Allow loading of different resources

const app = express();
const port  = process.env.PORT || 5000;

//Middleware
app.use(cors()); // enable cross origin requests from frontend to backend
app.use(express.json()); // parse incoming json requests. 

// MongoDB connection string for local instance
const mongoUri = 'mongodb://localhost:27017/school';

// MongoDB connection 
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  // Define a schem and model for audition_data collection
const Schema = mongoose.Schema;

// This is the document object for reference of all data objects upcoming.
const auditionDataSchema =  new Schema({
    NAMETAG: String,
    LAST: String,
    FIRST: String,
    PRONOUNS: String,
    INSTRUMENT: String,
    AGE: Number,
    EXPERIENCE: String,
}, {collection: 'audition_test'});

const AuditionData = mongoose.model('auditionData', auditionDataSchema); // Mongoose is a library that handles mongodb requests SERVERSIDE

// Run a route to get the actual data
// Define a route to get data, this is what executes the mongoDB query server side, this route finds all students
app.get('/data', async (req, res) => {
    try {
      const data = await AuditionData.find({});
      console.log('Data:', data);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//Define a route to get individual student data
app.get('/data/:id', async(req, res) => {
  try {
    const student = await AuditionData.findById(req.params.id);
    res.json(student); 
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
});

// Define a route to post data, this is the post data endpoint
app.post('/data', async (req, res) => {
    const {name, id, musicScore, adaptScore, techniqueScore, prepScore } = req.body; 

    const newStudent = new AuditionData({
        NAMETAG: id,
        LAST: '', //Fill as required
        FIRST: name, 
        PRONOUNS: '',
        INSTRUMENT: '', // Fill as required
        AGE: 0, // 
        EXPERIENCE: ''
    }); 

    try {
        await newStudent.save(); // The server receieves the data, creates a new document in 'audition_test' collection, and saves it
        res.status(201).json(newStudent);
    } catch(err) {
        res.status(500).json({ message: err.message}); 
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`); // () => is a callback function that runs as a condition of a promise. 
}); 