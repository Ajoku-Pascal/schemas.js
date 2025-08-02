const mongoose = require('mongoose');

const whatsappIntegrationSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },

  businessNumber: {
    type: String,
    required: true,
    unique: true
  },

  isIntegrated: {
    type: Boolean,
    default: false
  },

  apiCredentials: {
    apiKey: String,
    apiSecret: String,
    provider: {
      type: String,
      enum: ['twilio', '360dialog', 'meta', 'custom']
    },
    webhookUrl: String
  },

  shopShareLink: {
    type: String // e.g., https://wa.me/?text=Check+out+our+shop+at+link
  },

  productStatusUpdates: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      imageUrl: String,
      caption: String,
      sharedAt: Date
    }
  ],

  contacts: [
    {
      name: String,
      phone: { type: String, unique: true },
      tags: [String],
      lastMessageAt: Date,
      isCustomer: { type: Boolean, default: false }
    }
  ],

  messageTemplates: [
    {
      name: String,
      category: {
        type: String,
        enum: ['order_update', 'promotion', 'greeting', 'reminder', 'support']
      },
      body: String, // use {{variables}} for dynamic insertion
      createdAt: { type: Date, default: Date.now }
    }
  ],

  broadcasts: [
    {
      title: String,
      messageTemplateId: {
        type: mongoose.Schema.Types.ObjectId
      },
      recipientPhones: [String],
      sentAt: Date,
      status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending'
      }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WhatsAppIntegration', whatsappIntegrationSchema);
