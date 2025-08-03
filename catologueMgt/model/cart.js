const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  quantity: { type: Number, default: 1 },
  price: Number,
  total: Number,
  image: String
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for guest
  sessionId: { type: String }, // for guest carts (stored by client, e.g., cookies)

  items: [cartItemSchema],
  totalItems: { type: Number, default: 0 },
  subtotal: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },

  currency: { type: String, default: 'NGN' },
  isCheckoutComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

cartSchema.pre('save', function (next) {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
  this.totalAmount = this.subtotal + this.shipping;
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model('Cart', cartSchema);