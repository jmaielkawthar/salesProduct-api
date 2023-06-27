let mongoose = require('mongoose');
const Commande = require('../models/commande');

let transportationSchema = new mongoose.Schema({

  name_transportation: {
    type: String,
    required: true,
    default: "Aramex",
    unique: true, // Set the unique option to true
  },
  telephone: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
    default: 6,
  },
  date_delivery: {
    type: Date,
  },
  commande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande',
  },
});

module.exports = mongoose.model('Transportation', transportationSchema)