const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/ProductRoutes');
app.use('/api/products', productRoutes);
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Sample Route
app.get('/', (req, res) => {
    res.send('E-commerce Backend API is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

