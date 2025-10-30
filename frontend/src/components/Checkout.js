import React, { useState } from "react";
import { checkout } from "../api";

export default function Checkout({ cart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    setLoading(true);
    checkout(cart, name, email)
      .then((res) => {
        setReceipt(res.data);
        alert("✅ Checkout successful!");
      })
      .catch(() => alert("❌ Checkout failed. Try again!"))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>💳 Checkout</h2>

      {!receipt ? (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
        </form>
      ) : (
        <div className="receipt">
          <h3>🧾 Receipt</h3>
          <p><strong>Name:</strong> {receipt.customer}</p>
          <p><strong>Email:</strong> {receipt.email}</p>
          <p><strong>Total:</strong> ₹{receipt.total}</p>
          <p><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          <button onClick={() => window.location.reload()}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
