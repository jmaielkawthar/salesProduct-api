const mongoose = require('mongoose');
const Product = require('../models/product');
const Transportation = require('../models/transportation');
const User = require('../models/user');

let commandeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  orderedProducts: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
  transportation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transportation',
  },
});

// Define the virtual property 'userRef' to establish the one-to-many relationship
commandeSchema.virtual('userRef', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
});

// Define the virtual property 'products' to establish the one-to-many relationship
commandeSchema.virtual('products', {
  ref: 'Product',
  localField: 'orderedProducts.product',
  foreignField: '_id',
});

// Define the virtual property 'transportationRef' to establish the one-to-many relationship
commandeSchema.virtual('transportationRef', {
  ref: 'Transportation',
  localField: 'transportation',
  foreignField: '_id',
});

module.exports = mongoose.model('Commande', commandeSchema);