import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import API from '../utils/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token, res.data.username);
      toast.success('Welcome back!');
      navigate('/admin/queries');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      {/* Left — Big image panel */}
      <div className="login-left">
        <div className="login-photo">
          <img
            src="https://images.unsplash.com/photo-1552168324-d612d77725e3?w=900&q=80"
            alt="Photography studio"
          />
        </div>
        <div className="login-brand">
          <div className="login-logo">576 MEGAPIXELS</div>
          <div className="login-logo-sub">Photography</div>
          <p className="login-tagline">Admin Dashboard</p>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Welcome<br />Back</h1>
          <p className="login-sub">Sign in to manage your studio</p>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>


          <a href="/" className="back-home">← Back to Website</a>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
