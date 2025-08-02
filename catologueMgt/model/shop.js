const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true }, // for shareable links: e.g. /shop/cyber-deals
  description: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  logoUrl: String,
  bannerUrl: String,

  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', shopSchema);


// shop product.js //

const productSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },

  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  category: { type: String, index: true },
  tags: [String],

  price: Number,
  discountPrice: Number,

  images: [String],
  stock: Number,
  isActive: { type: Boolean, default: true },

  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

  createdAt: { type: Date, default: Date.now }
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);


// category.js //

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  iconUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);
