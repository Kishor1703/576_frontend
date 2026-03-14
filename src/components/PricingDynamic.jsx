import { useEffect, useState } from 'react';
import API from '../utils/api';
import './Pricing.css';

const PricingDynamic = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await API.get('/pricing');
        setPlans(res.data);
      } catch {
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section id="pricing" className="pricing-section section">
      <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.3)' }}>Investment</p>
      <h2 className="section-title">Pricing Packages</h2>
      <div className="black-line"></div>
      <p className="section-subtitle">Transparent pricing for every occasion</p>

      <div className="pricing-grid">
        {!loading && plans.map((plan) => (
          <div key={plan._id} className={`pricing-card ${plan.highlight ? 'highlighted' : ''}`}>
            {plan.highlight && <div className="popular-badge">Most Popular</div>}
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">{plan.price}</div>
              <div className="plan-duration">{plan.duration}</div>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}><span className="check">✓</span> {feature}</li>
              ))}
            </ul>
            <button className="plan-btn" onClick={() => scrollTo('contact')}>
              Book Now
            </button>
          </div>
        ))}
      </div>

      {!loading && plans.length === 0 && (
        <p className="pricing-note">
          Pricing packages will appear here once they are added from the admin panel.
        </p>
      )}

      {plans.length > 0 && (
        <p className="pricing-note">
          * Custom packages available for destination weddings and corporate events.
          <button onClick={() => scrollTo('contact')} className="pricing-note-link">
            Contact us
          </button> for a tailored quote.
        </p>
      )}
    </section>
  );
};

export default PricingDynamic;
