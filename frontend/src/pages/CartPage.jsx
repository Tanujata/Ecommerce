import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/api';

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const products = cart.map(item => ({
      product: item._id,
      quantity: item.quantity
    }));

    await createOrder({ products, totalAmount });

    localStorage.removeItem('cart');
    alert('Order placed successfully');
    navigate('/my-orders');
  };

  return (
    <div className="container mt-4">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ${totalAmount}</h4>
          <button className="btn btn-success" onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default CartPage;
