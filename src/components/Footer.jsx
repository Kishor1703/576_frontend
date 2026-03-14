import './Footer.css';
import logoImg from '../assests/LOGO.jpg.jpeg';

const Footer = () => {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-brand-lockup">
            <img src={logoImg} alt="576 Megapixels" className="footer-logo-img" />
            <div>
              <div className="footer-logo-name">576 MEGAPIXELS</div>
              <div className="footer-logo-sub">Photography</div>
            </div>
          </div>
          <p className="footer-tagline">
            Turning fleeting moments into timeless memories,<br />
            one frame at a time.
          </p>
          <div className="footer-socials">
            {['Instagram', 'Facebook', 'YouTube'].map(s => (
              <a key={s} href="#!" className="footer-social">{s}</a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigate</h4>
          {['Portfolio', 'Pricing', 'About', 'Contact'].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="footer-link">
              {l}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <p className="footer-contact-item">Dindigul, Tamil Nadu, India</p>
          <a href="tel:+919994700481" className="footer-contact-item">+91 99947 00481</a>
          <a href="mailto:megapixelsphotography018@gmail.com" className="footer-contact-item">
            megapixelsphotography018@gmail.com
          </a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} 576 Megapixels Photography · Dindigul, Tamil Nadu</p>
        <a href="/admin/login" className="footer-admin-link">Admin</a>
      </div>
    </footer>
  );
};

export default Footer;
