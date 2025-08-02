const mongoose = require('mongoose');

const logisticsSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },

  provider: {
    name: { type: String, required: true },
    partnerId: { type: String }, // e.g., third-party ID (if using API)
    contactPhone: String,
    trackingUrl: String,
    apiWebhookUrl: String
  },

  trackingInfo: {
    trackingNumber: String,
    currentStatus: {
      type: String,
      enum: ['pending', 'picked_up', 'in_transit', 'delivered', 'failed'],
      default: 'pending'
    },
    statusHistory: [
      {
        status: String,
        updatedAt: { type: Date, default: Date.now },
        location: String,
        note: String
      }
    ]
  },

  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    geoLocation: {
      lat: Number,
      lng: Number
    }
  },

  deliveryZone: {
    zoneName: String,
    zoneCode: String,
    region: String,
    surcharge: Number // extra fee per zone
  },

  shippingCost: {
    baseRate: Number,
    distanceFee: Number,
    total: Number
  },

  notifications: [
    {
      type: { type: String, enum: ['email', 'whatsapp', 'sms'] },
      message: String,
      sentAt: Date
    }
  ],

  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

logisticsSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Logistics', logisticsSchema);
