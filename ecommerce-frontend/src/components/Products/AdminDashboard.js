import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../api';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard - Manage Products</h2>

      <div className="mb-3 text-end">
        <Link to="/products/new" className="btn btn-success">Add New Product</Link>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td><img src={p.imageUrl} alt={p.name} width="80" /></td>
              <td>
                <Link to={`/products/edit/${p._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
