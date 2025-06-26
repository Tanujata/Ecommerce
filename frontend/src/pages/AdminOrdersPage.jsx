import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../services/api';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getAllOrders();
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name} ({order.user.email})</td>
                <td>
                  {order.products.map(p => (
                    <div key={p.product._id}>
                      {p.product.title} (x{p.quantity})
                    </div>
                  ))}
                </td>
                <td>${order.totalAmount}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default AdminOrdersPage;
