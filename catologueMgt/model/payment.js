// File: models/Payment.js
const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  bankName: String,
  accountNumber: String,
  accountName: String,
  isVerified: { type: Boolean, default: false },
  verificationRef: String // for Paystack/Opay verification ref
}, { _id: false });

const mobileMoneySchema = new mongoose.Schema({
  provider: { type: String, enum: ['MTN', 'Airtel', 'Glo', '9mobile'] },
  phoneNumber: String,
  isVerified: { type: Boolean, default: false },
  verificationRef: String
}, { _id: false });

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  currency: { type: String, default: 'NGN' },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  type: { type: String, enum: ['payment', 'payout', 'refund'] },
  method: { type: String, enum: ['bank', 'mobile_money', 'paystack', 'opay'] },
  reference: String,
  metadata: Object,
  createdAt: { type: Date, default: Date.now }
});

const paymentLinkSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  currency: { type: String, default: 'NGN' },
  link: String, // e.g. https://pay.site/abc123
  isActive: { type: Boolean, default: true },
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now }
});

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  bankAccount: bankAccountSchema,
  mobileMoney: mobileMoneySchema,

  gateways: {
    paystack: {
      publicKey: String,
      secretKey: String,
      isConnected: { type: Boolean, default: false }
    },
    opay: {
      merchantId: String,
      apiKey: String,
      isConnected: { type: Boolean, default: false }
    }
  }
});

const Payment = mongoose.model('Payment', paymentSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const PaymentLink = mongoose.model('PaymentLink', paymentLinkSchema);

module.exports = { Payment, Transaction, PaymentLink };
