const express = require('express');
const Student = require('../models/Student');
const auth = require('../middlewares/auth'); // JWT authentication middleware

const router = express.Router();

// Read Profile
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    res.json(student);
  } catch (err) {
    res.status(500).send('Error fetching profile');
  }
});

// Update Profile
router.put('/', auth, async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      req.studentId,
      { name, email },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).send('Error updating profile');
  }
});

module.exports = router;
