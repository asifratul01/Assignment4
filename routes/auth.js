const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

const router = express.Router();

// Student Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, email, password: hashedPassword });
    await student.save();
    res.status(201).send('Student registered successfully');
  } catch (err) {
    res.status(500).send('Error registering student');
  }
});

// Student Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: student._id }, 'jwtSecretKey', {
      expiresIn: '1h',
    });

    // Set JWT token in cookies
    res.cookie('token', token, { httpOnly: true });
    res.send('Logged in successfully');
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
