import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";

export default function ProductList({ refreshCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const handleAdd = (id) => {
    addToCart(id, 1).then(refreshCart);
  };

  return (
    <div className="grid">
      {products.map((p) => (
        <div className="card" key={p._id}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => handleAdd(p._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
