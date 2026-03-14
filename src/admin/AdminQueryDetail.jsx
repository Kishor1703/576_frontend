import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';
import './AdminQueryDetail.css';

const AdminQueryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => { fetchQuery(); }, [id]);

  const fetchQuery = async () => {
    try {
      const res = await API.get(`/queries/${id}`);
      setQuery(res.data);
    } catch {
      toast.error('Query not found');
      navigate('/admin/queries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      const res = await API.patch(`/queries/${id}/status`, { status });
      setQuery(res.data);
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Update failed');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this query permanently?')) return;
    try {
      await API.delete(`/queries/${id}`);
      toast.success('Query deleted');
      navigate('/admin/queries');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (!query) return null;

  const STATUS_OPTIONS = ['new', 'read', 'replied'];
  const STATUS_COLORS = { new: '#c9a84c', read: '#888', replied: '#4caf50' };

  return (
    <div className="query-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate('/admin/queries')}>
          ← Back to Queries
        </button>
        <div className="detail-actions">
          <select
            value={query.status}
            onChange={e => updateStatus(e.target.value)}
            disabled={updating}
            className="status-select"
            style={{ borderColor: STATUS_COLORS[query.status], color: STATUS_COLORS[query.status] }}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <button className="danger-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="detail-card">
            <div className="detail-card-header">
              <h2 className="detail-name">{query.name}</h2>
              <span className="detail-date">
                {new Date(query.createdAt).toLocaleDateString('en-IN', { 
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
                })}
              </span>
            </div>

            <div className="detail-info-grid">
              {[
                { label: 'Email', value: query.email, href: `mailto:${query.email}` },
                { label: 'Phone', value: query.phone || 'Not provided' },
                { label: 'Event Type', value: query.eventType },
                { label: 'Event Date', value: query.eventDate || 'Not specified' },
              ].map(item => (
                <div key={item.label} className="detail-info-item">
                  <span className="info-label">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="info-value link">{item.value}</a>
                  ) : (
                    <span className="info-value">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="message-section">
              <h3 className="message-label">Message</h3>
              <div className="message-content">{query.message}</div>
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="detail-card">
            <h3 className="sidebar-section-title">Quick Actions</h3>
            <div className="quick-actions">
              <a href={`mailto:${query.email}?subject=Re: ${query.eventType} Photography Inquiry`} className="action-btn">
                Reply via Email
              </a>
              {query.phone && (
                <a href={`tel:${query.phone}`} className="action-btn">
                  Call Client
                </a>
              )}
              <button className="action-btn active" onClick={() => updateStatus('replied')} disabled={query.status === 'replied'}>
                Mark as Replied
              </button>
            </div>
          </div>

          <div className="detail-card">
            <h3 className="sidebar-section-title">Status Timeline</h3>
            <div className="timeline">
              {[
                { key: 'new', label: 'Query Received', done: true },
                { key: 'read', label: 'Query Reviewed', done: query.status !== 'new' },
                { key: 'replied', label: 'Replied to Client', done: query.status === 'replied' },
              ].map(step => (
                <div key={step.key} className={`timeline-step ${step.done ? 'done' : ''}`}>
                  <div className="timeline-dot"></div>
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQueryDetail;
