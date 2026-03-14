import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';
import './AdminQueries.css';

const STATUS_COLORS = { new: '#c9a84c', read: '#888', replied: '#4caf50' };

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => { fetchQueries(); }, []);

  const fetchQueries = async () => {
    try {
      const res = await API.get('/queries');
      setQueries(res.data);
    } catch {
      toast.error('Failed to load queries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this query?')) return;
    try {
      await API.delete(`/queries/${id}`);
      setQueries(queries.filter(q => q._id !== id));
      toast.success('Query deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const filtered = filter === 'all' ? queries : queries.filter(q => q.status === filter);

  const counts = {
    all: queries.length,
    new: queries.filter(q => q.status === 'new').length,
    read: queries.filter(q => q.status === 'read').length,
    replied: queries.filter(q => q.status === 'replied').length,
  };

  return (
    <div className="admin-queries">
      <div className="page-header">
        <div>
          <h1 className="page-title">Queries</h1>
          <p className="page-sub">Manage client inquiries and bookings</p>
        </div>
      </div>

      <div className="query-stats">
        {Object.entries(counts).map(([key, count]) => (
          <button
            key={key}
            className={`stat-card ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            <div className="stat-count">{count}</div>
            <div className="stat-name">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p>No {filter === 'all' ? '' : filter} queries found.</p>
        </div>
      ) : (
        <div className="queries-table">
          <div className="table-header">
            <span>Name</span>
            <span>Event Type</span>
            <span>Date</span>
            <span>Status</span>
            <span>Received</span>
            <span>Actions</span>
          </div>
          {filtered.map(query => (
            <div
              key={query._id}
              className={`table-row ${query.status === 'new' ? 'row-new' : ''}`}
              onClick={() => navigate(`/admin/queries/${query._id}`)}
            >
              <div className="col-name">
                {query.status === 'new' && <span className="new-dot"></span>}
                <span>{query.name}</span>
              </div>
              <span className="col-event">{query.eventType}</span>
              <span className="col-date">{query.eventDate || '—'}</span>
              <span className="col-status">
                <span className="status-badge" style={{ color: STATUS_COLORS[query.status], borderColor: STATUS_COLORS[query.status] }}>
                  {query.status}
                </span>
              </span>
              <span className="col-received">
                {new Date(query.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              <span className="col-actions">
                <button
                  className="delete-btn"
                  onClick={(e) => handleDelete(e, query._id)}
                  title="Delete"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                  </svg>
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminQueries;
