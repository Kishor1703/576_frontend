import { useState, useEffect } from 'react';
import API from '../utils/api';
import './Portfolio.css';

const CATEGORIES = ['All', 'Wedding', 'Baby Shower', 'Portrait', 'Engagement', 'Birthday', 'Corporate', 'Other'];

const Portfolio = () => {
  const [photos, setPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = async () => {
    try {
      const res = await API.get('/photos');
      setPhotos(res.data);
    } catch { setPhotos([]); }
    finally { setLoading(false); }
  };

  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="portfolio section">
      <p className="section-eyebrow">Our Work</p>
      <h2 className="section-title">Portfolio</h2>
      <div className="black-line"></div>
      <p className="section-subtitle">Stories told through the lens</p>

      <div className="category-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >{cat}</button>
        ))}
      </div>

      {loading ? (
        <div className="portfolio-loading"><div className="loading-spinner"></div></div>
      ) : filtered.length === 0 ? (
        <div className="portfolio-empty">
          <div className="empty-grid">
            {Array(9).fill(0).map((_, i) => (
              <div key={i} className="placeholder-photo">
                <div className="placeholder-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21,15 16,10 5,21"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <p className="empty-text">Photos will appear here once uploaded.</p>
        </div>
      ) : (
        <div className="photo-grid">
          {filtered.map((photo) => (
            <div key={photo._id} className="photo-item" onClick={() => setLightbox(photo)}>
              <img src={photo.url} alt={photo.title} loading="lazy" />
              <div className="photo-overlay">
                <span className="photo-title">{photo.title}</span>
                <span className="photo-category">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.title} />
            <div className="lightbox-info">
              <h3>{lightbox.title}</h3>
              <span>{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
