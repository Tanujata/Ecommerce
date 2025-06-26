import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProductList from "./components/Products/ProductList";
import ProductForm from "./components/Products/ProductForm";
import Orders from "./components/Orders/Orders";
import Cart from './components/cart/Cart';
import Checkout from './components/Orders/Checkout';
import Profile from './components/cart/Profile'; // 👈 Import Profile
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} /> {/* ✅ Profile Route */}
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </div>
    </>
  );
}
