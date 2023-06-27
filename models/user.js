let mongoose = require('mongoose');
const Commande = require('../models/commande');


let userSchema = new mongoose.Schema({
  cin_user: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  telephone:{
    type: Number,
    required: true,
  },
  age:{
    type: Number,
  },
  email:{
    type: String,
    required: true,
  },
  adresse:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
    default: "0000",
  },
  role:{
    type: String,
    default: "user",
  },
  commande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande',
  },
})

module.exports = mongoose.model('User', userSchema)