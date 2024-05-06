const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors module

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS middleware
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://sireesha2622:Siri12345@cluster0.ekefhyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// Route handler for root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the User Registration API');
});

// Route handler for user registration
app.post('/register', async (req, res) => {
  try {
    // Extract username, email, and password from request body
    const { username, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });

    // Save new user to the database
    await newUser.save();

    // Return success response with username
    res.status(201).json({ message: 'User registered successfully', username });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
