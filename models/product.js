let mongoose = require('mongoose');
const Category = require('../models/category');
const Commande = require('../models/commande');

let productSchema = new mongoose.Schema({

  name_product: {
    type: String,
    required: true,
    unique: true, // Set the unique option to true
  },
  price:{
    type: String,
    default: 0,
  },

  image: {
    type: String,
  },
  date: {
    type: String,
  },
  description: {
    type: String,
  },
  ref: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  commande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande',
  },
});

module.exports = mongoose.model('Product', productSchema)