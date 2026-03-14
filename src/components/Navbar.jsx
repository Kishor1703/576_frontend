import { useState, useEffect } from 'react';
import logoImg from '../assests/LOGO.jpg.jpeg';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Only show after hero (when scrolled past hero)
  if (!scrolled && !menuOpen) return null;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={logoImg} alt="576 Megapixels logo" className="nav-logo-img" />
        <div className="nav-logo-text">
          <span className="logo-text">576 MEGAPIXELS</span>
          <span className="logo-sub">Photography</span>
        </div>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {['portfolio', 'pricing', 'about', 'contact'].map(s => (
          <button key={s} onClick={() => scrollTo(s)} className="nav-link">
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <a href="/admin/login" className="nav-admin-link">Admin</a>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
};

export default Navbar;
