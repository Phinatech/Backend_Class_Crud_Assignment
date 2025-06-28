// Correct import if you are using named export
import Product from '../../models/productsSchema.js';

// Create a new product
export const createProduct = async (req, res) => {
  const { name, price, color, size } = req.body;
  const user = req.user;

  if (!name || !price || !color || !size) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const newProduct = new Product({ ...req.body, userId: user._id });
    await newProduct.save();
    res.status(201).json({ message: 'New Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products created by logged-in user
export const getUserProducts = async (req, res) => {
  const user = req.user;
  try {
    const products = await Product.find({ userId: user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products (public)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by query params
export const getByqueryParams = async (req, res) => {
  const { name, price, year } = req.query;
  const filter = {};

  if (name) filter.name = name;
  if (price) filter.price = price;
  if (year) filter.year = year;

  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit product by owner
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, color, size } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findOne({ _id: id, userId });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.color = color ?? product.color;
    product.size = size ?? product.size;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const product = await Product.findOneAndDelete({ _id: id, userId });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
