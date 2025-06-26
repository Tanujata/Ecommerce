const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const imageUrl = req.file?.location;

    const product = new Product({ name, price, description, category, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create Error:', err);
    res.status(500).json({ message: 'Error creating product' });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) updates.imageUrl = req.file.location;

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.json({ message: 'Product deleted successfully' });
};
