const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Express app setup
const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the actual frontend URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventsDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
  createInitialAdmin();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define the Event model
const EventSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  extendedProps: {
    location: String,
    description: String,
  },
});
const Event = mongoose.model('Event', EventSchema);

// Admin schema
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', AdminSchema);

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.adminId = decoded.id; // Attach the admin's ID to the request
    next();
  });
};

// Create an initial admin if none exists
const createInitialAdmin = async () => {
  const adminUsername = 'ANURAG23'; // Hardcoded admin username
  const adminPassword = 'admin123'; // Hardcoded admin password

  try {
    const admin = await Admin.findOne({ username: adminUsername });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newAdmin = new Admin({ username: adminUsername, password: hashedPassword });
      await newAdmin.save();
      console.log(`Initial admin created with username: "${adminUsername}" and password: "${adminPassword}"`);
    } else {
      console.log('Admin already exists');
    }
  } catch (err) {
    console.error('Error creating admin:', err);
  }
};

// Admin login route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error('Login route error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Fetch all events (publicly accessible)
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add event (admin-protected)
app.post('/events', verifyAdminToken, async (req, res) => {
  const { title, start, end, extendedProps } = req.body;

  try {
    const newEvent = new Event({ title, start, end, extendedProps });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error adding event', error: err });
  }
});

// Delete event (admin-protected)
app.delete('/events/:id', verifyAdminToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err });
  }
});

// Update event (admin-protected)
app.put('/events/:id', verifyAdminToken, async (req, res) => {
  const { title, start, end, extendedProps } = req.body;
  const { id } = req.params;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, start, end, extendedProps },
      { new: true } // Return the updated event
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err });
  }
});

// Add contact endpoint
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Log the contact details
  console.log('Contact Form Submission:', { name, email, message });

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
          user: 'rjcanurag11sci763@gmail.com', // Your email
          pass: 'ktxp hjry decw fiqf',  // App password if using Gmail
      },
  });

  // Set up email data
  let mailOptions = {
      from: 'rjcanurag11sci763@gmail.com', 
      to: email,  
      subject: 'Thank You for Contacting Us',  
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message: "${message}" and will get back to you soon.\n\nBest Regards, Your Company`,
  };

  try {
      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Contact details submitted and email sent successfully' });
  } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error submitting contact details or sending email', error: error.message });
  }
});

// Server listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
