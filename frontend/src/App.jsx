import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-product" element={<ProductFormPage />} />
          <Route path="/edit-product/:id" element={<ProductFormPage />} />
          <Route path="/cart" element={<CartPage />} />
<Route path="/my-orders" element={<OrderHistoryPage />} />
<Route path="/admin-orders" element={<AdminOrdersPage />} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;