const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or 'Vendor' if you use a separate vendor model
    required: true
  },

  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    default: 'daily'
  },

  dateRange: {
    start: Date,
    end: Date
  },

  keyMetrics: {
    totalSales: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalCustomers: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    averageOrderValue: { type: Number, default: 0 },
    returningCustomerRate: { type: Number, default: 0 }
  },

  salesTrends: [
    {
      date: Date,
      orders: Number,
      revenue: Number
    }
  ],

  customerInsights: {
    newCustomers: Number,
    returningCustomers: Number,
    averageTimeOnSite: Number, // in seconds
    topLocations: [String]
  },

  productPerformance: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      productName: String,
      views: Number,
      purchases: Number,
      conversionRate: Number // purchases/views
    }
  ],

  transactions: [
    {
      transactionId: String,
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      amount: Number,
      status: { type: String, enum: ['success', 'failed', 'pending'] },
      paymentMethod: String,
      createdAt: Date
    }
  ],

  generatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
