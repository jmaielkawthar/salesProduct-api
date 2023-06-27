const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');

// GET: Return all Category
router.get('/', async (req, res) => {
  try {
    // Fetch all Category from the database
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET: Get a category by ID
router.get('/:id', async (req, res) => {
  try {
    // Find the category by ID 
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST: Add a new Category to the database
router.post('/', async (req, res) => {
  const category = new Category({
    name_category: req.body.name_category,
  });

  try {
    // Save the new Category to the database
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Edit a Category by ID
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the category properties
    category.name_category = req.body.name_category;

  
    // Save the updated category to the database
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;