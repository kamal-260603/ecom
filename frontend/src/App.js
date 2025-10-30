import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { getCart } from "./api";
import "./styles.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const refreshCart = () => {
    getCart().then((res) => {
      setCart(res.data.cart);
      setTotal(res.data.total);
    });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <div className="container">
      <h1>🛍️ Vibe Commerce</h1>
      <ProductList refreshCart={refreshCart} />
      <Cart cart={cart} total={total} refreshCart={refreshCart} />
      <Checkout cart={cart} />
    </div>
  );
}
