const express = require('express');
const multer = require('multer');
const fs = require('fs');
const auth = require('../middlewares/auth');
const Student = require('../models/Student');

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// File upload
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.studentId, {
      profilePic: req.file.path,
    });
    res.send('File uploaded successfully');
  } catch (err) {
    res.status(500).send('Error uploading file');
  }
});

// File read
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(__dirname + '/../uploads/' + filename);
});

// File delete
router.delete('/:filename', auth, (req, res) => {
  const filename = req.params.filename;
  const path = __dirname + '/../uploads/' + filename;

  fs.unlink(path, err => {
    if (err) return res.status(500).send('Error deleting file');
    res.send('File deleted successfully');
  });
});

module.exports = router;
