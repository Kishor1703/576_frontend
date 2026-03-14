import { useState, useEffect } from 'react';
import logoImg from '../assests/LOGO.jpg.jpeg';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  if (!isMobile && !scrolled) return null;

  return (
    <>
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

      <nav className={`navbar ${scrolled || isMobile ? 'visible' : ''}`}>
        <div className="navbar-inner">
          <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logoImg} alt="576 Megapixels" className="nav-brand-img" />
            <div className="nav-brand-text">
              <span className="nav-brand-name">576 MEGAPIXELS</span>
              <span className="nav-brand-sub">Photography</span>
            </div>
          </div>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <button className="nav-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close">
              <span /><span />
            </button>
            {['portfolio','pricing','about','contact'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="nav-link">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <a href="/admin/login" className="nav-admin">Admin</a>
          </div>

          <button className={`nav-burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
