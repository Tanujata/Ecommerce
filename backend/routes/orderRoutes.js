const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// User places a new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const newOrder = new Order({
      user: req.user.id,
      products,
      totalAmount
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin view all orders
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('products.product', 'title price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User view their own orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product', 'title price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
