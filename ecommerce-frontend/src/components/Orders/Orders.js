import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../../api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      await deleteOrder(id);
      fetchOrders();
    }
  };

  const downloadBill = (order) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('🎂 Bandar-Mitai Invoice 🎂', 70, 10);

    // Basic Info
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 10, 25);
    doc.text(`Customer: ${order.customerName}`, 10, 32);
    doc.text(`Shipping Address: ${order.shippingAddress || 'N/A'}`, 10, 39);
    doc.text(`Order Date: ${new Date(order.createdAt).toLocaleString() || 'N/A'}`, 10, 46);
    doc.text(`Total Amount: ₹${order.totalAmount}`, 10, 53);

    // Table
    if (order.items && order.items.length > 0) {
      autoTable(doc, {
        startY: 60,
        head: [['Item', 'Quantity', 'Price']],
        body: order.items.map((item) => [
          item.name,
          item.quantity,
          `₹${item.price}`,
        ]),
      });
    }

    // Footer
    doc.setFontSize(13);
    doc.text('Thank you for shopping with Bandar-Mitai!', 50, doc.lastAutoTable?.finalY + 20 || 120);

    doc.save(`Order_${order._id}.pdf`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🧾 Orders</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customerName}</td>
              <td>₹{order.totalAmount}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => downloadBill(order)}
                >
                  Download Bill
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
