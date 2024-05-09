const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Route handler for creating a new user
router.post('/', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    const newUser = new User({ username, email, password });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully', username });
  } catch (error) {
    next(error);
  }
});

// Route handler for deleting a user by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Route handler for fetching all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'Users retrieved successfully', data: users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
