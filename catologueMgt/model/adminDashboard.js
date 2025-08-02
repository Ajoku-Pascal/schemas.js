const mongoose = require('mongoose');

const adminDashboardSchema = new mongoose.Schema({
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure this user has isAdmin: true or a role system
    required: true
  },

  // Platform Management
  systemSettings: {
    maintenanceMode: { type: Boolean, default: false },
    siteTitle: String,
    contactEmail: String,
    smsGatewayStatus: { type: String, enum: ['active', 'inactive'], default: 'active' },
    paymentGatewayStatus: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },

  // User Management & Support
  userSupportTickets: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      subject: String,
      message: String,
      status: { type: String, enum: ['open', 'closed', 'pending'], default: 'open' },
      adminResponse: String,
      createdAt: { type: Date, default: Date.now },
      resolvedAt: Date
    }
  ],

  userActionsLog: [
    {
      action: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      performedAt: { type: Date, default: Date.now },
      details: mongoose.Schema.Types.Mixed
    }
  ],

  // System Monitoring
  systemHealth: {
    cpuUsage: Number, // %
    memoryUsage: Number, // %
    dbStatus: { type: String, enum: ['online', 'degraded', 'offline'], default: 'online' },
    lastChecked: { type: Date, default: Date.now }
  },

  // Content Management
  flaggedContents: [
    {
      contentId: mongoose.Schema.Types.ObjectId,
      contentType: { type: String, enum: ['product', 'review', 'comment'] },
      reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reason: String,
      status: { type: String, enum: ['pending', 'reviewed', 'removed'], default: 'pending' },
      reviewedAt: Date
    }
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

adminDashboardSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('AdminDashboard', adminDashboardSchema);
