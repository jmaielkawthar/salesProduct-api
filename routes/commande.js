const express = require('express');
const router = express.Router();
const Commande = require('../models/commande');
const User = require('../models/user');
const Product = require('../models/product');
const Transportation = require('../models/transportation');

// GET: Return all commande
router.get('/', async (req, res) => {
  try {
    // Fetch all commande from the database
    const commande = await Commande.find();
    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Find a commande by ID
router.get('/:id', async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate('user') // Populate the 'user' field
      .populate('orderedProducts.product') // Populate the 'product' field in 'orderedProducts'
      .populate('transportation'); // Populate the 'transportation' field

    if (!commande) {
      return res.status(404).json({ message: 'commande not found' });
    }

    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new commande to the database
router.post('/', async (req, res) => {
  const commande = new Commande({
    quantite: req.body.quantite,
  });

  try {
    // Save the new commande to the database
    const newCommande = await commande.save();
    res.status(201).json(newCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Edit a commande by ID
router.put('/:id', async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);

    if (!commande) {
      return res.status(404).json({ message: 'commande not found' });
    }

    // Update the commande properties
    commande.quantite = req.body.quantite;

  
    // Save the updated commande to the database
    const updatedCommande = await commande.save();
    res.json(updatedCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove a commande by ID
router.delete('/:id', async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    res.json({ message: 'commande deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;