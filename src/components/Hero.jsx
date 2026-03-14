import { useEffect, useRef, useState } from 'react';
import './Hero.css';
import heroImg from '../assests/sathis.jpeg';
import logoImg from '../assests/LOGO.jpg.jpeg';

const NAV_LINKS = ['Portfolio', 'Pricing', 'About', 'Contact'];

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const imgRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform =
          `scale(1.06) translateY(${window.scrollY * 0.18}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <section id="hero" className="hero">

      {/* ── FULL-BLEED PHOTO ── */}
      <div className="hero-photo">
        <img ref={imgRef} src={heroImg} alt="Photographer" />
        <div className="hero-photo-vignette" />
      </div>

      {/* ── TOP NAV ── */}
      <header className="hero-header">
        <div className="hero-header-inner">
          <div className="hero-brand">
            <img src={logoImg} alt="576 Megapixels" className="hero-brand-logo" />
            <div className="hero-brand-text">
              <span className="hero-brand-name">576 MEGAPIXELS</span>
              <span className="hero-brand-sub">Photography · Dindigul</span>
            </div>
          </div>

          {/* Desktop links */}
          <nav className="hero-nav">
            {NAV_LINKS.map(s => (
              <button key={s} onClick={() => scrollTo(s.toLowerCase())} className="hero-nav-link">
                {s}
              </button>
            ))}
            <a href="/admin/login" className="hero-nav-admin">Admin</a>
          </nav>

          {/* Hamburger */}
          <button
            className={`hero-burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div className={`hero-drawer-bg ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`hero-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-brand">
          <img src={logoImg} alt="" className="drawer-logo" />
          <span>576 MEGAPIXELS</span>
        </div>
        <nav className="drawer-nav">
          {NAV_LINKS.map((s, i) => (
            <button
              key={s}
              className="drawer-link"
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => scrollTo(s.toLowerCase())}
            >
              <span className="drawer-link-num">0{i+1}</span>
              {s}
            </button>
          ))}
        </nav>
        <a href="/admin/login" className="drawer-admin">Admin Login →</a>
      </aside>

      {/* ── HERO BODY ── */}
      <div className="hero-body pt-5">
        <div className="hero-body-inner">

          {/* Tag line */}
          <p className="hero-tag">
            <span className="hero-tag-line" />
            Dindigul, Tamil Nadu
          </p>

          {/* Big title */}
          <h1 className="hero-title">
            <span className="ht line-1">We</span>
            <span className="ht line-2"><em>Capture</em></span>
            <span className="ht line-3">Your Story</span>
          </h1>

          {/* Services pill row */}
          <div className="hero-services">
            {['Wedding', 'Baby Shower', 'Portrait', 'Engagement'].map(s => (
              <span key={s} className="hero-service-pill">{s}</span>
            ))}
          </div>

          <div className="hero-actions">
            <button className="btn-dark" onClick={() => scrollTo('portfolio')}>
              View Portfolio
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>
              Book a Session
            </button>
          </div>
        </div>
      </div>


      {/* ── SCROLL CUE ── */}
      <div className="hero-scroll" onClick={() => scrollTo('portfolio')}>
        <div className="hs-track"><div className="hs-dot" /></div>
        <span>Scroll</span>
      </div>

    </section>
  );
};

export default Hero;
