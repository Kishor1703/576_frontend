import { useState, useEffect, useRef } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';
import './AdminPhotos.css';

const CATEGORIES = ['Wedding', 'Baby Shower', 'Portrait', 'Engagement', 'Birthday', 'Corporate', 'Other'];
const MAX_UPLOAD_SIZE = 4 * 1024 * 1024;

const AdminPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filterCat, setFilterCat] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', featured: false });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = async () => {
    try {
      const res = await API.get('/photos');
      setPhotos(res.data);
    } catch {
      toast.error('Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_UPLOAD_SIZE) {
      toast.error('Photo must be 4MB or smaller on the deployed site');
      e.target.value = '';
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) { toast.error('Please select a photo'); return; }
    if (!form.title || !form.category) { toast.error('Title and category are required'); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('title', form.title);
      formData.append('category', form.category);
      formData.append('featured', form.featured);

      const res = await API.post('/photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPhotos([res.data, ...photos]);
      toast.success('Photo uploaded successfully!');
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo permanently?')) return;
    try {
      await API.delete(`/photos/${id}`);
      setPhotos(photos.filter(p => p._id !== id));
      toast.success('Photo deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const toggleFeatured = async (photo) => {
    try {
      const res = await API.patch(`/photos/${photo._id}`, { featured: !photo.featured });
      setPhotos(photos.map(p => p._id === photo._id ? res.data : p));
      toast.success(res.data.featured ? 'Marked as featured' : 'Removed from featured');
    } catch {
      toast.error('Update failed');
    }
  };

  const closeModal = () => {
    setShowUploadModal(false);
    setForm({ title: '', category: '', featured: false });
    setSelectedFile(null);
    setPreview(null);
  };

  const filtered = filterCat === 'All' ? photos : photos.filter(p => p.category === filterCat);

  return (
    <div className="admin-photos">
      <div className="page-header">
        <div>
          <h1 className="page-title">Photos</h1>
          <p className="page-sub">Manage your portfolio gallery</p>
        </div>
        <button className="btn-filled upload-btn" onClick={() => setShowUploadModal(true)}>
          + Upload Photo
        </button>
      </div>

      {/* Stats Bar */}
      <div className="photo-stats-bar">
        <div className="photo-stat-item">
          <span className="psi-num">{photos.length}</span>
          <span className="psi-label">Total Photos</span>
        </div>
        <div className="photo-stat-item">
          <span className="psi-num">{photos.filter(p => p.featured).length}</span>
          <span className="psi-label">Featured</span>
        </div>
        {CATEGORIES.slice(0, 4).map(cat => (
          <div key={cat} className="photo-stat-item">
            <span className="psi-num">{photos.filter(p => p.category === cat).length}</span>
            <span className="psi-label">{cat}</span>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="category-filters">
        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filterCat === cat ? 'active' : ''}`}
            onClick={() => setFilterCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </div>
          <p>No photos yet. Click <strong>Upload Photo</strong> to get started.</p>
        </div>
      ) : (
        <div className="admin-photo-grid">
          {filtered.map(photo => (
            <div key={photo._id} className="admin-photo-card">
              <div className="photo-thumb">
                <img src={photo.url} alt={photo.title} loading="lazy" />
                <div className="photo-card-overlay">
                  <button
                    className={`overlay-btn ${photo.featured ? 'featured-active' : ''}`}
                    onClick={() => toggleFeatured(photo)}
                    title={photo.featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    ★
                  </button>
                  <button
                    className="overlay-btn delete"
                    onClick={() => handleDelete(photo._id)}
                    title="Delete photo"
                  >
                    ✕
                  </button>
                </div>
                {photo.featured && <div className="featured-badge">Featured</div>}
              </div>
              <div className="photo-card-info">
                <div className="photo-card-title">{photo.title}</div>
                <div className="photo-card-cat">{photo.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Upload Photo</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>

            <form onSubmit={handleUpload} className="upload-form">
              {/* Drop Zone */}
              <div
                className={`drop-zone ${preview ? 'has-preview' : ''}`}
                onClick={() => fileInputRef.current.click()}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="drop-preview" />
                ) : (
                  <div className="drop-placeholder">
                    <div className="drop-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    <p>Click to select photo</p>
                    <small>JPG, PNG, WEBP up to 4MB</small>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="form-row-modal">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    placeholder="e.g. Priya & Rahul Wedding"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="">Select category...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="featured-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                  />
                  <span className="toggle-custom"></span>
                  Mark as Featured Photo
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-primary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-filled" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPhotos;
