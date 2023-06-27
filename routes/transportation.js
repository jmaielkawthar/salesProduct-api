const express = require('express');
const router = express.Router();
const Transportation = require('../models/transportation');
const Product  = require('../models/product');

// GET: Return all Transportation
router.get('/', async (req, res) => {
  try {
    // Fetch all Transportation from the database
    const transportation = await Transportation.find();
    res.json(transportation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET: Get a transportation by ID
router.get('/:id', async (req, res) => {
  try {
    // Find the transportation by ID 
    const transportation = await Transportation.findById(req.params.id);

    if (!transportation) {
      return res.status(404).json({ message: 'transportation not found' });
    }

    res.json(transportation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST: Add a new Transportation to the database
router.post('/', async (req, res) => {
  const transportation = new Transportation({
    name_transportation: req.body.name_transportation,
    prix: req.body.prix,
    telephone: req.body.telephone,
    date_delivery: req.body.date_delivery,
  });

  try {
    // Save the new transportation to the database
    const newTransportation = await transportation.save();
    res.status(201).json(newTransportation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Edit a transportation by ID
router.put('/:id', async (req, res) => {
  try {
    const transportation = await Transportation.findById(req.params.id);

    if (!transportation) {
      return res.status(404).json({ message: 'transportation not found' });
    }

    // Update the transportation properties
    transportation.name_transportation= req.body.name_transportation;
    transportation.prix= req.body.prix;
    transportation.telephone= req.body.telephone;
    transportation.date_delivery=req.body.date_delivery;

  
    // Save the updated transportation to the database
    const updatedTransportation = await transportation.save();
    res.json(updatedTransportation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove a transportation by ID
router.delete('/:id', async (req, res) => {
  try {
    const transportation = await Transportation.findByIdAndDelete(req.params.id);
    res.json({ message: 'transportation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;