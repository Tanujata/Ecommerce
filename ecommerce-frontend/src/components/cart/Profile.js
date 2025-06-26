import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setUser(userData || {});
    setCart(cartData);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const downloadBill = () => {
    const doc = new jsPDF();
    doc.text(`Invoice for ${user.name}`, 14, 15);
    doc.autoTable({
      startY: 25,
      head: [['Product', 'Price', 'Qty', 'Subtotal']],
      body: cart.map(item => [
        item.name,
        `₹${item.price}`,
        item.quantity,
        `₹${item.price * item.quantity}`
      ])
    });
    doc.text(`Total: ₹${total}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save('invoice.pdf');
  };

  return (
    <div className="container profile-page mt-4">
      <h3>Welcome, {user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <h5>Your Cart</h5>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end"><strong>Grand Total</strong></td>
                <td><strong>₹{total}</strong></td>
              </tr>
            </tbody>
          </table>
                 </>
      )}
    </div>
  );
}
