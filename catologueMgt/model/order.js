const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: String,
  quantity: { type: Number, required: true },
  unitPrice: Number,
  totalPrice: Number
}, { _id: false });

const orderStatusHistorySchema = new mongoose.Schema({
  status: { type: String },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
  note: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },

  items: [orderItemSchema],

  subtotal: Number,
  shippingCost: Number,
  totalAmount: Number,
  currency: { type: String, default: 'NGN' },

  paymentMethod: { type: String, enum: ['card', 'bank_transfer', 'mobile_money', 'cash_on_delivery'] },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentReference: String,

  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },

  statusHistory: [orderStatusHistorySchema],

  notes: String,
  isFulfilled: { type: Boolean, default: false },
  fulfilledAt: Date,
  trackingNumber: String,
  courier: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
