import axios from "axios";

const API = "http://localhost:5000/api";

export const getProducts = () => axios.get(`${API}/products`);
export const getCart = () => axios.get(`${API}/cart`);
export const addToCart = (productId, qty) => axios.post(`${API}/cart`, { productId, qty });
export const removeFromCart = (id) => axios.delete(`${API}/cart/${id}`);
export const checkout = (cartItems, name, email) =>
  axios.post(`${API}/checkout`, { cartItems, name, email });
