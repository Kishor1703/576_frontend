import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminQueries from './admin/AdminQueries';
import AdminQueryDetail from './admin/AdminQueryDetail';
import AdminPhotos from './admin/AdminPhotos';
import AdminPricing from './admin/AdminPricing';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/admin/login" replace />;
};

// Custom cursor (only on public pages)
const Cursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    let raf;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const grow = () => {
      cursorRef.current?.classList.add('cursor-active');
      ringRef.current?.classList.add('cursor-ring-active');
    };

    const shrink = () => {
      cursorRef.current?.classList.remove('cursor-active');
      ringRef.current?.classList.remove('cursor-ring-active');
    };

    const press = () => {
      cursorRef.current?.classList.add('cursor-pressed');
      ringRef.current?.classList.add('cursor-ring-pressed');
    };

    const release = () => {
      cursorRef.current?.classList.remove('cursor-pressed');
      ringRef.current?.classList.remove('cursor-ring-pressed');
    };

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
    document.addEventListener('mousedown', press);
    document.addEventListener('mouseup', release);

    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', press);
      document.removeEventListener('mouseup', release);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Cursor />
        <Toaster position="top-right" toastOptions={{
          style: { fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', background: '#0d0d0d', color: '#fff', borderRadius: '0' }
        }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="queries" replace />} />
            <Route path="queries" element={<AdminQueries />} />
            <Route path="queries/:id" element={<AdminQueryDetail />} />
            <Route path="photos" element={<AdminPhotos />} />
            <Route path="pricing" element={<AdminPricing />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
