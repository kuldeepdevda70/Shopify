const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  salePrice: Number,
  totalStock: Number,
  averageReview: Number,
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product; // Directly exporting the model
