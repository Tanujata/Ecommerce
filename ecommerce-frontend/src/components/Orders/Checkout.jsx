// src/components/orders/Checkout.jsx

import React, { useState, useEffect } from 'react';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(stored);
  }, []);

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrder = () => {
    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }

    const order = {
      items: cartItems,
      total: getTotal(),
      shippingAddress: address,
      date: new Date().toISOString()
    };

    // You can send this to your backend later
    console.log("Order placed:", order);

    localStorage.removeItem('cart');
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="container mt-4">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <h5>Total: ₹{getTotal()}</h5>

      <div className="mb-3">
        <label>Shipping Address</label>
        <textarea
          className="form-control"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={placeOrder}>Place Order</button>
    </div>
  );
}