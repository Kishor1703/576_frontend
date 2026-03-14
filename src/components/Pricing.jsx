import './Pricing.css';

const PLANS = [
  {
    name: 'Essential',
    price: '₹15,000',
    duration: 'Half Day · 4 Hours',
    tag: 'Great start',
    features: ['4 Hours Coverage','150 Edited Photos','1 Photographer','Online Gallery Access','Print-Ready Files','2 Weeks Delivery'],
    highlight: false,
  },
  {
    name: 'Premium',
    price: '₹28,000',
    duration: 'Full Day · 8 Hours',
    tag: 'Most popular',
    features: ['8 Hours Coverage','350 Edited Photos','2 Photographers','Online Gallery Access','Print-Ready + Web Files','Same Week Delivery','Photobook (20 Pages)'],
    highlight: true,
  },
  {
    name: 'Luxury',
    price: '₹55,000',
    duration: '2 Days Coverage',
    tag: 'Complete package',
    features: ['2 Days Coverage','Unlimited Edited Photos','3 Photographers','Private Online Gallery','All File Formats','48hr Rush Delivery','Premium Photobook (50 Pages)','Video Highlights Reel'],
    highlight: false,
  },
];

const Pricing = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="pricing">
      {/* Header */}
      <div className="pricing-top">
        <p className="eyebrow" style={{ color: 'var(--gold2)' }}>
          <span style={{ background: 'var(--gold2)', width: 32, height: 1, display: 'inline-block', flexShrink: 0 }} />
          Investment
        </p>
        <h2 className="pricing-heading">
          Choose Your<br /><em>Package</em>
        </h2>
        <p className="pricing-sub">
          Transparent, all-inclusive pricing for every occasion.
          No hidden fees, no surprises.
        </p>
      </div>

      {/* Cards */}
      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.highlight ? 'hl' : ''}`}>
            <div className="pc-tag">{plan.tag}</div>
            <div className="pc-head">
              <h3 className="pc-name">{plan.name}</h3>
              <div className="pc-price">{plan.price}</div>
              <div className="pc-dur">{plan.duration}</div>
            </div>
            <div className="pc-rule" />
            <ul className="pc-features">
              {plan.features.map(f => (
                <li key={f}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`pc-btn ${plan.highlight ? 'pc-btn-hl' : ''}`} onClick={() => scrollTo('contact')}>
              Book This Package
            </button>
          </div>
        ))}
      </div>

      <p className="pricing-note">
        Custom packages for destination weddings & corporate events.{' '}
        <button onClick={() => scrollTo('contact')} className="pricing-note-link">
          Contact us →
        </button>
      </p>
    </section>
  );
};

export default Pricing;
