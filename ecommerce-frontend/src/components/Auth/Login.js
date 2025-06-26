import React, { useState } from 'react';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password, role });
      const userData = res.data;

      if (!userData.user || userData.user.role !== role) {
        alert(`This account is not registered as a ${role}.`);
        return;
      }

      localStorage.setItem('user', JSON.stringify(userData.user));
      localStorage.setItem('token', userData.token);

      alert('Login successful');
      navigate(userData.user.role === 'admin' ? '/admin' : '/products');
    } catch (error) {
      const msg = error?.response?.data?.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <div className="position-relative vh-100 overflow-hidden">
      {/* 🍰 Blurred Background Image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2016/07/18/19/26/dessert-1526592_1280.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          zIndex: 1,
        }}
      ></div>

      {/* 🎂 Foreground Content */}
      <div
        className="position-relative d-flex justify-content-center align-items-center vh-100"
        style={{ zIndex: 2 }}
      >
        <div
          className="bg-white p-4 rounded shadow"
          style={{ width: '100%', maxWidth: '400px', opacity: 0.95 }}
        >
          <h2 className="text-center mb-4 text-danger fw-bold">🎂 Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email <i className="bi bi-envelope-fill ms-1"></i></label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password <i className="bi bi-lock-fill ms-1"></i></label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Login as</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-danger w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
