const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const CartItem = require("./models/CartItem");
const productsData = require("./data/products");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (local mongosh)
mongoose
  .connect("mongodb://127.0.0.1:27017/vibe_commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB connected");
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(productsData);
      console.log("🌱 Seeded default products");
    }
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===== ROUTES =====

// GET products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET cart
app.get("/api/cart", async (req, res) => {
  const cart = await CartItem.find().populate("productId");
  const total = cart.reduce((sum, item) => sum + item.productId.price * item.qty, 0);
  res.json({
    cart: cart.map((i) => ({
      id: i._id,
      productId: i.productId._id,
      name: i.productId.name,
      price: i.productId.price,
      qty: i.qty,
    })),
    total,
  });
});

// POST add to cart
app.post("/api/cart", async (req, res) => {
  const { productId, qty } = req.body;
  const existing = await CartItem.findOne({ productId });
  if (existing) {
    existing.qty += qty;
    await existing.save();
  } else {
    await CartItem.create({ productId, qty });
  }
  const updatedCart = await CartItem.find().populate("productId");
  res.json(updatedCart);
});

// DELETE from cart
app.delete("/api/cart/:id", async (req, res) => {
  const id = req.params.id;
  await CartItem.findOneAndDelete({ productId: id });
  const updatedCart = await CartItem.find().populate("productId");
  res.json(updatedCart);
});

// POST checkout
app.post("/api/checkout", async (req, res) => {
  const { cartItems, name, email } = req.body;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = {
    customer: name,
    email,
    total,
    timestamp: new Date().toISOString(),
  };
  await CartItem.deleteMany();
  res.json(receipt);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
