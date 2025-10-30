import React from "react";
import { removeFromCart } from "../api";

export default function Cart({ cart, total, refreshCart }) {
  const handleRemove = (id) => {
    removeFromCart(id).then(refreshCart);
  };

  return (
    <div>
      <h2>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              {item.name} - ₹{item.price} × {item.qty}
              <button onClick={() => handleRemove(item.productId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}
