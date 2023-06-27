const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product  = require('../models/product');




// GET: Return all product
router.get('/', async (req, res) => {
  try {
    // Fetch all products from the database and populate the 'category' field
    const products = await Product.find().populate('category');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET: Get a product by ID
router.get('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID and populate the 'category' field
    const product = await Product.findById(productId).populate('category');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new Product to the database
router.post('/', async (req, res) => {
  const { name_product, price, image, description, ref, name_category } = req.body;

  try {

     // Find the category by name
     const category = await Category.findOne({ name_category });

     if (!category) {
       return res.status(404).json({ message: 'Category not found' });
     }
     const product = new Product({
      name_product,
      price,
      image,
      description,
      ref,
      category: category._id, // Assign the category's _id to the product's category field
    });
    // Save the new user to the database
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Edit a Product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product properties

    product.name_product= req.body.name_product,
    product.price=req.body.price,
    product.number= req.body.number,
    product.image= req.body.image,
    product.description= req.body.description,
    product.date= req.body.date;

    // Find the category by name
     const category = await Category.findOne({ name_category: req.body.name_category });

     if (!category) {
       return res.status(404).json({ message: 'Category not found' });
     }
 
     product.category = [category._id];// Assign the category's _id to the product's category field
    
  
    // Save the updated product to the database
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove a Product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;