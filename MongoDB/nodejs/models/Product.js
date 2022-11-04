const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
{
  name: { type: String, required: true, maxLength: 50 },
  price: {
    type: Number,
    default: 0,
    required: true,
    min: [0, "Must be at least 0, got {VALUE}"],
  },
  discount: { type: Number, default: 0, min: 0, max: 100, required: true },
  stock: { type: Number, default: 0, min: 0, required: false },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  description: {
    type: String,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
