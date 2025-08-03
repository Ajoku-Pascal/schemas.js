const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneOrEmail: {
    type: String,
    required: true,
    index: true
  },

  otpCode: {
    type: String,
    required: true
  },

  purpose: {
    type: String,
    enum: ['login', 'register', 'reset_password', '2fa'],
    required: true
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  expiresAt: {
    type: Date,
    required: true
  },

  attempts: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically delete expired OTPs after `expiresAt`
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Otp', otpSchema);
