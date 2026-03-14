import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import logoImg from '../assests/LOGO.jpg.jpeg';
import './AdminLayout.css';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img src={logoImg} alt="576 Megapixels logo" className="sidebar-logo-img" />
          <div>
            <div className="sidebar-name">576 MEGAPIXELS</div>
            <div className="sidebar-user">{admin?.username}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-section-label">Management</p>

          <NavLink to="/admin/queries" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span className="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
            </span>
            Queries
          </NavLink>

          <NavLink to="/admin/photos" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span className="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
            </span>
            Photos
          </NavLink>

          <NavLink to="/admin/pricing" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span className="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </span>
            Pricing
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <a href="/" className="sidebar-link" target="_blank" rel="noreferrer">
            <span className="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </span>
            View Website
          </a>
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <span className="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </span>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
