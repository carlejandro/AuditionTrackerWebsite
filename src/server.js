// This sets up an Express server that connects to a MongoDB database using Mongoose, 
// defines a schema and model, and provides routes to interact with the data.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Allow loading of different resources

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable cross-origin requests from frontend to backend
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection string for local instance
const mongoUri = 'mongodb://localhost:27017/school';

// MongoDB connection
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model for audition_data collection
const Schema = mongoose.Schema;

// This is the document object for reference of all data objects upcoming.
const auditionDataSchema = new Schema({
  NAMETAG: String,
  LAST: String,
  FIRST: String,
  PRONOUNS: String,
  INSTRUMENT: String,
  AGE: Number,
  EXPERIENCE: String,
  MUSICSCORE: Number,
  ADAPTSCORE: Number,
  TECHNIQUESCORE: Number,
  PREPSCORE: Number,
}, { collection: 'audition_test' });

const AuditionData = mongoose.model('AuditionData', auditionDataSchema); // Mongoose is a library that handles MongoDB requests server-side

// Run a route to get the actual data
// Define a route to get data, this is what executes the MongoDB query server-side, this route finds all students
app.get('/data', async (req, res) => {
  try {
    const data = await AuditionData.find({});
    console.log('Data:', data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define a route to get individual student data
app.get('/data/:id', async (req, res) => {
  try {
    const student = await AuditionData.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post data endpoint for ADDING NEW student records, scores initalized @ 0 to start. 
app.post('/data', async (req, res) => {
  const { name, id } = req.body;

  const newStudent = new AuditionData({
    NAMETAG: id,
    LAST: '', // Fill as required
    FIRST: name,
    PRONOUNS: '',
    INSTRUMENT: '', // Fill as required
    AGE: 0, // Fill as required
    EXPERIENCE: '',
    MUSICSCORE: 0,
    ADAPTSCORE: 0,
    TECHNIQUESCORE: 0,
    PREPSCORE: 0,
  });

  try {
    await newStudent.save(); // The server receives the data, creates a new document in 'audition_test' collection, and saves it
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to update the CURRENT student score records
app.put('/data/:id', async (req, res) => {
  const { id } = req.params;
  const { musicScore, adaptScore, techniqueScore, prepScore } = req.body;

  try {
    const student = await AuditionData.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Link the DB attributes with the const variables
    student.MUSICSCORE = musicScore;
    student.ADAPTSCORE = adaptScore;
    student.TECHNIQUESCORE = techniqueScore;
    student.PREPSCORE = prepScore;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.put('/data/:id', async (req, res) => {
//   const { id } = req.params;
//   const { instrument } = req.body
  
//   try{
//     const student = await AuditionData.findById(req.body); 
//     if(!student) {
//       return res.status(404).json({ message: 'Student not found'}); 
//     }
//     student.INSTRUMENT = instrument; 

//   }
// }

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // () => is a callback function that runs as a condition of a promise.
});


