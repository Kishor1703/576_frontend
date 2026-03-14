import { useEffect, useRef } from 'react';
import './Hero.css';
import heroImg from '../assests/sathis.jpeg';
import logoImg from '../assests/LOGO.jpg.jpeg';

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY;
        imgRef.current.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-image-wrap">
        <div className="hero-image" ref={imgRef}>
          <img
            src={heroImg}
            alt="Photographer at work"
          />
        </div>
        <div className="hero-image-overlay"></div>
      </div>

      <div className="hero-topbar">
        <div className="hero-logo">
          <img src={logoImg} alt="576 Megapixels logo" className="hero-logo-img" />
          <div className="hero-logo-text">
            <span className="logo-name">576 MEGAPIXELS</span>
            <span className="logo-sub">Photography</span>
          </div>
        </div>
        <div className="hero-nav-top">
          {['Portfolio', 'Pricing', 'About', 'Contact'].map(s => (
            <button key={s} onClick={() => scrollTo(s.toLowerCase())}>{s}</button>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text-block">
          <p className="hero-eyebrow">
            <span className="eyebrow-line"></span>
            Dindigul
          </p>
          <h1 className="hero-title">
            <span className="title-line line-1">Capturing</span>
            <span className="title-line line-2"><em>Moments</em></span>
            <span className="title-line line-3">That Last</span>
          </h1>
          <p className="hero-desc">Wedding · Baby Shower · Portrait · Engagement</p>
          <div className="hero-cta">
            <button className="btn-filled hero-btn" onClick={() => scrollTo('portfolio')}>
              <span>View Portfolio</span>
            </button>
            <button className="btn-primary hero-btn" onClick={() => scrollTo('contact')}>
              <span>Book a Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* <div className="hero-stats">
        {[['500+', 'Sessions'], ['8+', 'Years'], ['50+', 'Awards'], ['100%', 'Satisfied']].map(([n, l]) => (
          <div key={l} className="hero-stat">
            <span className="stat-num">{n}</span>
            <span className="stat-label">{l}</span>
          </div>
        ))}
      </div> */}

      <div className="hero-scroll-wrap" onClick={() => scrollTo('portfolio')}>
        <div className="scroll-track">
          <div className="scroll-thumb"></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
