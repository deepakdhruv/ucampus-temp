// models/OrderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [
    {
      name: String,
      size: String,
      qty: Number,
      price: Number,
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
