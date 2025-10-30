const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  qty: Number,
});

module.exports = mongoose.model("CartItem", cartItemSchema);
