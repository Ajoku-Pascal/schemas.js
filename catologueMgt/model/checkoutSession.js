const mongoose = require('mongoose');
const checkoutSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for guest
  sessionId: String, // guest checkout

  shippingAddress: {
    name: String,
    phone: String,
    email: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },

  paymentOption: {
    type: String,
    enum: ['paystack', 'opay', 'bank_transfer', 'mobile_money', 'cash_on_delivery'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },

  orderSummary: {
    subtotal: Number,
    shipping: Number,
    total: Number,
    currency: { type: String, default: 'NGN' }
  },

  isCompleted: { type: Boolean, default: false },
  completedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CheckoutSession', checkoutSchema);
