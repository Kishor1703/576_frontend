import { useState, useEffect } from 'react';
import API from '../utils/api';
import './Portfolio.css';

const CATEGORIES = ['All', 'Wedding', 'Baby Shower', 'Portrait', 'Engagement', 'Birthday', 'Corporate', 'Other'];

const Portfolio = () => {
  const [photos, setPhotos] = useState([]);
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = async () => {
    try { const r = await API.get('/photos'); setPhotos(r.data); }
    catch { setPhotos([]); }
    finally { setLoading(false); }
  };

  const filtered = active === 'All' ? photos : photos.filter(p => p.category === active);

  return (
    <section id="portfolio" className="portfolio">
      {/* Section header */}
      <div className="portfolio-header">
        <div className="portfolio-header-left">
          <p className="eyebrow">Our Work</p>
          <h2 className="portfolio-title">
            Portfolio<br /><em>Gallery</em>
          </h2>
          <div className="gold-rule" />
        </div>
        <p className="portfolio-header-desc">
          Every frame tells a story. Browse our collection of carefully crafted images
          from weddings, portraits, and life's most memorable celebrations.
        </p>
      </div>

      {/* Category tabs */}
      <div className="portfolio-cats">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`pcat-btn ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="port-loading"><div className="port-spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="port-empty">
          <div className="port-empty-grid">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="port-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
              </div>
            ))}
          </div>
          <p>Photos appear once uploaded via admin panel.</p>
        </div>
      ) : (
        <div className="port-grid">
          {filtered.map((photo, i) => (
            <div
              key={photo._id}
              className={`port-item ${i % 7 === 0 || i % 7 === 4 ? 'tall' : ''}`}
              onClick={() => setLightbox(photo)}
            >
              <img src={photo.url} alt={photo.title} loading="lazy" />
              <div className="port-item-hover">
                <div className="port-item-info">
                  <span className="port-item-cat">{photo.category}</span>
                  <span className="port-item-title">{photo.title}</span>
                </div>
                <div className="port-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <div className="lb-inner" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.title} />
            <div className="lb-meta">
              <span className="lb-title">{lightbox.title}</span>
              <span className="lb-cat">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
