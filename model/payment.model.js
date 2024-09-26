const mongoose = require('mongoose');
const db = require("../config/db");

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PaymentModel = db.model('Payment', PaymentSchema);

module.exports = PaymentModel;