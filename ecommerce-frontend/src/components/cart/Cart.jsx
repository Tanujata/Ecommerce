// src/components/cart/Cart.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (index, change) => {
    const updated = [...cartItems];
    updated[index].quantity += change;
    if (updated[index].quantity <= 0) updated[index].quantity = 1;
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                  </td>
                  <td><img src={item.imageUrl} width="80" alt={item.name} /></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ₹{getTotal()}</h4>
          <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}
