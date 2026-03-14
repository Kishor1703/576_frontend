import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../utils/api';
import './Contact.css';

const EVENT_TYPES = ['Wedding', 'Baby Shower', 'Engagement', 'Portrait', 'Birthday', 'Corporate', 'Other'];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', eventDate: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventType || !form.message) {
      toast.error('Please fill all required fields'); return;
    }
    setSubmitting(true);
    try {
      await API.post('/queries', form);
      toast.success("Query sent! We'll get back to you soon.");
      setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', message: '' });
    } catch { toast.error('Something went wrong. Please try again.'); }
    finally { setSubmitting(false); }
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="contact-inner">
        <div className="contact-info">
          <p className="section-eyebrow" style={{ textAlign: 'left' }}>Get In Touch</p>
          <h2 className="contact-heading">
            Let's Create Something<br /><em>Beautiful</em>
          </h2>
          <p className="contact-desc">
            Have a special event coming up? Reach out and let's discuss how we can capture your most precious moments.
          </p>
          <div className="contact-details">
            {[
              { icon: '📍', label: 'Location', value: 'Dindigul, Tamil Nadu, India' },
              { icon: '📞', label: 'Phone', value: '+91 99947 00481' },
              { icon: '✉️', label: 'Email', value: 'megapixelsphotography018@gmail.com' },
              // { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9am – 7pm' },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <span className="contact-icon">{item.icon}</span>
                <div>
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3 className="form-title">Send a Query</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Event Type *</label>
              <select name="eventType" value={form.eventType} onChange={handleChange}>
                <option value="">Select event...</option>
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Event Date</label>
            <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Message *</label>
            <textarea name="message" rows={5} placeholder="Tell us about your event, venue, requirements..." value={form.message} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-filled submit-btn" disabled={submitting}>
            <span>{submitting ? 'Sending...' : 'Send Query'}</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
