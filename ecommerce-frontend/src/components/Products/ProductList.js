import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../api';
import { Link } from 'react-router-dom';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="product-grid">
      {products.map(p => (
        <div className="product-card" key={p._id}>
          <img src={p.imageUrl} alt={p.name} className="product-img" />
          <h5>{p.name}</h5>
          <p>₹{p.price}</p>
          <p>{p.description}</p>

          {isAdmin ? (
            <div className="admin-buttons">
              <Link to={`/products/edit/${p._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ) : (
            <button className="btn btn-sm btn-primary" onClick={() => addToCart(p)}>Add to Cart</button>
          )}
        </div>
      ))}
      {isAdmin && (
        <div className="text-center mt-4">
          <Link to="/products/new" className="btn btn-success">Add New Product</Link>
        </div>
      )}
    </div>
  );
}
