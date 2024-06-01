const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoUri = 'mongodb://localhost:27017/school';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

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

const AuditionData = mongoose.model('auditionData', auditionDataSchema);

app.get('/data', async (req, res) => {
  try {
    const data = await AuditionData.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/data/instrument/:instrument', async (req, res) => {
  try {
    const students = await AuditionData.find({ INSTRUMENT: req.params.instrument });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/data/:id', async (req, res) => {
  try {
    const student = await AuditionData.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/data', async (req, res) => {
  const { name, id, musicScore, adaptScore, techniqueScore, prepScore } = req.body;

  const newStudent = new AuditionData({
    NAMETAG: id,
    LAST: '',
    FIRST: name,
    PRONOUNS: '',
    INSTRUMENT: '',
    AGE: 0,
    EXPERIENCE: '',
    MUSICSCORE: musicScore,
    ADAPTSCORE: adaptScore,
    TECHNIQUESCORE: techniqueScore,
    PREPSCORE: prepScore,
  });

  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/data/:id', async (req, res) => {
  const { id } = req.params;
  const { musicScore, adaptScore, techniqueScore, prepScore } = req.body;

  try {
    const student = await AuditionData.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});