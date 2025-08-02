// File: models/Product.js
const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  basePrice: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    default: null
  },
  currency: {
    type: String,
    default: 'NGN'
  }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  images: [{
    type: String // URLs or file paths to image uploads
  }],

  price: {
    type: priceSchema,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },

  available: {
    type: Boolean,
    default: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, 
{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);
