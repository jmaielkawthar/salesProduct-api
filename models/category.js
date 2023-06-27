let mongoose = require('mongoose');
const Product  = require('../models/product');


let categorySchema = new mongoose.Schema({

  name_category: {
    type: String,
    required: true,
   unique: true, // Set the unique option to true
  },
  

});

// Define the virtual property 'products' to establish the one-to-many relationship
categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
});

module.exports = mongoose.model('Category', categorySchema)