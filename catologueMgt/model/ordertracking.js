const mongoose = require('mongoose');

const orderTrackingSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contactPhone: String,
  contactEmail: String,

  // Communication preferences
  notifyBy: {
    type: [String],
    enum: ['email', 'whatsapp'],
    default: ['email']
  },

  // Tracking info
  trackingCode: { type: String, unique: true },
  trackingLink: String,

  currentStatus: {
    type: String,
    enum: ['processing', 'shipped', 'in_transit', 'delivered', 'cancelled'],
    default: 'processing'
  },

  statusHistory: [
    {
      status: {
        type: String,
        enum: ['processing', 'shipped', 'in_transit', 'delivered', 'cancelled']
      },
      updatedAt: { type: Date, default: Date.now },
      note: String
    }
  ],

  deliveryNotifications: [
    {
      channel: { type: String, enum: ['email', 'whatsapp'] },
      message: String,
      sentAt: Date
    }
  ],

  supportContact: {
    name: String,
    phone: String,
    email: String,
    whatsapp: String
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderTrackingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('OrderTracking', orderTrackingSchema);
