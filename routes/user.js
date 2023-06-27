const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET: Return all users
router.get('/', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET: Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    // Find the user by ID 
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new user to the database
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    cin_user: req.body.cin_user,
    age: req.body.age,
    email: req.body.email,
    telephone: req.body.telephone,
    adresse: req.body.adresse,
    password: req.body.password,
    role: req.body.role,
  
  });

  try {
    // Save the new user to the database
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Edit a user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user properties
    user.name = req.body.name,
    user.cin_user= req.body.cin_user,
    user.age= req.body.age,
    user.email= req.body.email,
    user.telephone= req.body.telephone,
    user.adresse= req.body.adresse,
    user.password= req.body.password,
    user.role= req.body.role;
  
    // Save the updated user to the database
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;