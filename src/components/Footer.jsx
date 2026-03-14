import './Footer.css';
import logoImg from '../assests/LOGO.jpg.jpeg';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <div className="footer-brand-lockup">
          <img src={logoImg} alt="576 Megapixels logo" className="footer-logo-img" />
          <div>
            <div className="footer-logo">576 MEGAPIXELS</div>
            <div className="footer-logo-sub">Photography</div>
          </div>
        </div>
        <p className="footer-tagline">Capturing moments that last a lifetime</p>
      </div>
      <div className="footer-links">
        <h4>Navigation</h4>
        {['Portfolio', 'Pricing', 'About', 'Contact'].map(l => (
          <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>
            {l}
          </button>
        ))}
      </div>
      <div className="footer-social">
        <h4>Connect</h4>
        <div className="social-links">
          {['Instagram', 'Facebook', 'YouTube'].map(s => (
            <a key={s} href="#!" className="social-link">{s}</a>
          ))}
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} 576 MEGAPIXELS Photography · Dindigul, Tamil Nadu · All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
