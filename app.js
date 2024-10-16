const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const fileRoutes = require('./routes/file');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));

// MongoDB connection
mongoose
  .connect('mongodb://localhost/student-registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Route middlewares
app.use('/api/auth', authRoutes); // Handles student registration & login
app.use('/api/profile', profileRoutes); // Handles profile read and update
app.use('/api/file', fileRoutes); // Handles file upload, read, delete

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
