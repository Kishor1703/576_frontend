import { useEffect, useState } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';
import './AdminPhotos.css';
import './AdminPricing.css';

const emptyForm = {
  name: '',
  price: '',
  duration: '',
  features: '',
  highlight: false,
  order: 0
};

const AdminPricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await API.get('/pricing');
      setPlans(res.data);
    } catch {
      toast.error('Failed to load pricing plans');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (plan) => {
    setEditingId(plan._id);
    setForm({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: plan.features.join('\n'),
      highlight: plan.highlight,
      order: plan.order ?? 0
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      features: form.features.split('\n').map((feature) => feature.trim()).filter(Boolean),
      order: Number(form.order) || 0
    };

    if (!payload.name || !payload.price || !payload.duration || payload.features.length === 0) {
      toast.error('Fill in all fields and add at least one feature');
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const res = await API.patch(`/pricing/${editingId}`, payload);
        setPlans(plans.map((plan) => plan._id === editingId ? res.data : plan));
        toast.success('Pricing plan updated');
      } else {
        const res = await API.post('/pricing', payload);
        setPlans([...plans, res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        toast.success('Pricing plan added');
      }
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save pricing plan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this pricing plan?')) return;
    try {
      await API.delete(`/pricing/${id}`);
      setPlans(plans.filter((plan) => plan._id !== id));
      toast.success('Pricing plan deleted');
    } catch {
      toast.error('Failed to delete pricing plan');
    }
  };

  return (
    <div className="admin-pricing">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pricing</h1>
          <p className="page-sub">Manage the packages shown on your website</p>
        </div>
        <button className="btn-filled upload-btn" onClick={openCreateModal}>
          + Add Package
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : plans.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 3v18M3 12h18" />
            </svg>
          </div>
          <p>No pricing packages yet. Click <strong>Add Package</strong> to create one.</p>
        </div>
      ) : (
        <div className="pricing-admin-grid">
          {plans.map((plan) => (
            <article key={plan._id} className={`pricing-admin-card ${plan.highlight ? 'highlighted' : ''}`}>
              <div className="pricing-admin-top">
                <div>
                  <h3>{plan.name}</h3>
                  <p className="pricing-admin-price">{plan.price}</p>
                  <p className="pricing-admin-duration">{plan.duration}</p>
                </div>
                {plan.highlight && <span className="pricing-flag">Popular</span>}
              </div>

              <ul className="pricing-admin-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="pricing-admin-meta">
                <span>Order: {plan.order ?? 0}</span>
              </div>

              <div className="pricing-admin-actions">
                <button className="btn-primary" onClick={() => openEditModal(plan)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => handleDelete(plan._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal pricing-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingId ? 'Edit Package' : 'Add Package'}</h2>
              <button className="modal-close" onClick={closeModal}>x</button>
            </div>

            <form onSubmit={handleSubmit} className="pricing-form">
              <div className="form-row-modal">
                <div className="form-group">
                  <label>Package Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Premium"
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="Rs. 28,000"
                  />
                </div>
              </div>

              <div className="form-row-modal">
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="Full Day · 8 Hours"
                  />
                </div>
                <div className="form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Features</label>
                <textarea
                  rows="7"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder={'8 Hours Coverage\n350 Edited Photos\n2 Photographers'}
                />
                <small className="form-help">Add one feature per line.</small>
              </div>

              <label className="toggle-label pricing-toggle">
                <input
                  type="checkbox"
                  checked={form.highlight}
                  onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
                />
                <span className="toggle-custom"></span>
                Mark as Most Popular
              </label>

              <div className="modal-actions">
                <button type="button" className="btn-primary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-filled" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Package' : 'Add Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPricing;
