import './Pricing.css';

const PLANS = [
  {
    name: 'Essential',
    price: '₹15,000',
    duration: 'Half Day · 4 Hours',
    features: [
      '4 Hours Coverage',
      '150 Edited Photos',
      '1 Photographer',
      'Online Gallery Access',
      'Print-Ready Files',
      '2 Weeks Delivery',
    ],
    highlight: false,
  },
  {
    name: 'Premium',
    price: '₹28,000',
    duration: 'Full Day · 8 Hours',
    features: [
      '8 Hours Coverage',
      '350 Edited Photos',
      '2 Photographers',
      'Online Gallery Access',
      'Print-Ready + Web Files',
      'Same Week Delivery',
      'Photobook (20 Pages)',
    ],
    highlight: true,
  },
  {
    name: 'Luxury',
    price: '₹55,000',
    duration: '2 Days Coverage',
    features: [
      '2 Days Coverage',
      'Unlimited Edited Photos',
      '3 Photographers',
      'Private Online Gallery',
      'All File Formats',
      '48hr Rush Delivery',
      'Premium Photobook (50 Pages)',
      'Video Highlights Reel',
    ],
    highlight: false,
  },
];

const Pricing = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="pricing-section section">
      <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.3)' }}>Investment</p>
      <h2 className="section-title">Pricing Packages</h2>
      <div className="black-line"></div>
      <p className="section-subtitle">Transparent pricing for every occasion</p>

      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.highlight ? 'highlighted' : ''}`}>
            {plan.highlight && <div className="popular-badge">Most Popular</div>}
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">{plan.price}</div>
              <div className="plan-duration">{plan.duration}</div>
            </div>
            <ul className="plan-features">
              {plan.features.map(f => (
                <li key={f}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
            <button className="plan-btn" onClick={() => scrollTo('contact')}>
              Book Now
            </button>
          </div>
        ))}
      </div>

      <p className="pricing-note">
        * Custom packages available for destination weddings and corporate events.
        <button onClick={() => scrollTo('contact')} className="pricing-note-link">
          Contact us
        </button> for a tailored quote.
      </p>
    </section>
  );
};

export default Pricing;
