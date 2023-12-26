const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/Sanjana', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  tel: Number,
  email: String,
  password: String,
  college: String,
  course: String,
  dept: String,
  domain: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the registration form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/viewsregister.html');
});

// Handle registration form submission
app.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      gender: req.body.gender,
      tel: req.body.tel,
      email: req.body.email,
      password: req.body.password,
      college: req.body.college,
      course: req.body.course,
      dept: req.body.dept,
      domain: req.body.domain,
    });

    await newUser.save();
    res.sendFile(__dirname + '/sucess.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
