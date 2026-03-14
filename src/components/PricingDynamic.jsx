import { useEffect, useState } from 'react';
import API from '../utils/api';
import './Pricing.css';

const PricingDynamic = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    if (activeIndex > plans.length - 1) {
      setActiveIndex(0);
    }
  }, [plans, activeIndex]);

  const goTo = (index) => {
    if (!plans.length) return;
    const lastIndex = plans.length - 1;
    if (index < 0) {
      setActiveIndex(lastIndex);
      return;
    }
    if (index > lastIndex) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(index);
  };

  return (
    <section id="pricing" className="pricing">
      {/* Header */}
      <div className="pricing-top">
        <p className="eyebrow" style={{ justifyContent: 'center' }}>Investment</p>
        <h2 className="pricing-heading">
          Choose Your<br /><em>Package</em>
        </h2>
        <p className="pricing-sub">
          Transparent, all-inclusive pricing for every occasion.
          No hidden fees, no surprises.
        </p>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="pricing-loading">
          {[1, 2, 3].map(i => (
            <div key={i} className="pricing-skeleton" />
          ))}
        </div>
      )}

      {/* Plans */}
      {!loading && plans.length > 0 && (
        <>
          <div className="pricing-slider-shell">
            <div className="pricing-slider-head">
              <button className="pricing-arrow" onClick={() => goTo(activeIndex - 1)} aria-label="Previous package">
                ‹
              </button>
              <div className="pricing-counter">
                <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                <small>/ {String(plans.length).padStart(2, '0')}</small>
              </div>
              <button className="pricing-arrow" onClick={() => goTo(activeIndex + 1)} aria-label="Next package">
                ›
              </button>
            </div>

            <div className="pricing-slider-window">
              <div
                className="pricing-grid pricing-grid-slider"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {plans.map((plan) => (
                  <div key={plan._id} className="pricing-slide">
                    <div className={`pricing-card ${plan.highlight ? 'hl' : ''}`}>
                <div className="pc-tag">{plan.highlight ? 'Most popular' : 'Great value'}</div>
                <div className="pc-head">
                  <h3 className="pc-name">{plan.name}</h3>
                  <div className="pc-price">{plan.price}</div>
                  <div className="pc-dur">{plan.duration}</div>
                </div>
                <div className="pc-rule" />
                <ul className="pc-features">
                  {(plan.features || []).map(f => (
                    <li key={f}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`pc-btn ${plan.highlight ? 'pc-btn-hl' : ''}`}
                  onClick={() => scrollTo('contact')}
                >
                  Book This Package
                </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pricing-dots" aria-label="Pricing package navigation">
              {plans.map((plan, index) => (
                <button
                  key={plan._id}
                  className={`pricing-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${plan.name} package`}
                ></button>
              ))}
            </div>
              </div>

          <p className="pricing-note">
            Custom packages for destination weddings & corporate events.{' '}
            <button onClick={() => scrollTo('contact')} className="pricing-note-link">
              Contact us →
            </button>
          </p>
        </>
      )}

      {/* Empty state */}
      {!loading && plans.length === 0 && (
        <div className="pricing-empty">
          <p>Pricing packages will be available soon.</p>
          <button className="btn-gold" style={{ marginTop: '1.5rem' }} onClick={() => scrollTo('contact')}>
            Contact for Custom Quote
          </button>
        </div>
      )}
    </section>
  );
};

export default PricingDynamic;
