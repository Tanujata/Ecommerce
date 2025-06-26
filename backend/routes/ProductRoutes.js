const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../middleware/s3Upload'); // S3 upload middleware

// Create Product (with image upload)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const imageUrl = req.file?.location; // S3 image URL

        const product = new Product({
            name,
            price,
            description,
            category,
            imageUrl,
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Single Product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Product (with optional image update)
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) updates.imageUrl = req.file.location;

        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
