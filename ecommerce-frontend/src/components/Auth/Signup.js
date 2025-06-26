import React, { useState } from 'react';
import { register } from '../../api';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password, role });
      alert("🎉 Your cake is ready! Signup successful.");
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate(role === 'admin' ? '/admin' : '/products');
    } catch {
      alert("🍩 Oops! Signup failed. Please try again.");
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user); // Should show role: "admin"

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left: Full-height image covering half the screen */}
        <div className="col-md-6 p-0">
          <img
            src="https://cdn.pixabay.com/photo/2023/04/02/13/34/ai-generated-7894667_1280.jpg"
            alt="Cake"
            className="img-fluid w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Right: Signup form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="text-center mb-4">🧁 Join Our Cake Family!</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">🎂 Your Sweet Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Choco Lover"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">🍭 Email for Cake Updates</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g., sweettooth@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">🍰 Secret Cake Code</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Keep it yummy & safe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">🧁 I am signing up as:</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">Cake Lover</option>
                  <option value="admin">Master Baker (Admin)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-danger w-100">
                Bake My Account!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
