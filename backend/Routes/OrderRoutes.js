const express = require('express');
const OrderModel = require('../models/OrderModel'); // Import the Order model
const router = express.Router();

// Endpoint to save an order
router.post('/save', async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  if (!userId || !items || !totalAmount) {
    return res.status(400).json({ message: 'Missing required fields: userId, items, totalAmount' });
  }

  try {
    const newOrder = new OrderModel({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save(); // Save the order to MongoDB
    res.status(200).json({ message: 'Order saved successfully', order: newOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
});

// Endpoint to fetch orders by userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all orders by userId
    const orders = await OrderModel.find({ userId }).populate('userId'); // Populate user data if needed
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json(orders); // Return the orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

module.exports = router;
