import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../utils/api';
import './Contact.css';

const EVENT_TYPES = ['Wedding', 'Baby Shower', 'Engagement', 'Portrait', 'Birthday', 'Corporate', 'Other'];

const Contact = () => {
  const [form, setForm] = useState({ name:'', email:'', phone:'', eventType:'', eventDate:'', message:'' });
  const [submitting, setSubmitting] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventType || !form.message) {
      toast.error('Please fill all required fields'); return;
    }
    setSubmitting(true);
    try {
      await API.post('/queries', form);
      toast.success("Query sent! We'll be in touch soon.");
      setForm({ name:'', email:'', phone:'', eventType:'', eventDate:'', message:'' });
    } catch { toast.error('Something went wrong. Please try again.'); }
    finally { setSubmitting(false); }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">

        {/* Left — info */}
        <div className="contact-info">
          <p className="eyebrow">Get In Touch</p>
          <h2 className="contact-heading">
            Let's Capture<br />
            <em>Your Story</em>
          </h2>
          <div className="gold-rule" />
          <p className="contact-desc">
            Ready to book a session or have questions? We'd love to hear from you.
            Fill in your details and we'll get back to you within 24 hours.
          </p>

          <div className="contact-details">
            {[
              { icon: 'location', label: 'Location', value: 'Dindigul, Tamil Nadu, India' },
              { icon: 'phone',    label: 'Phone',    value: '+91 99947 00481' },
              { icon: 'email',    label: 'Email',    value: 'megapixelsphotography018@gmail.com' },
            ].map(item => (
              <div key={item.label} className="contact-detail">
                <div className="cd-icon">
                  {item.icon === 'location' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  )}
                  {item.icon === 'phone' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a2 2 0 011.72-2.07h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  )}
                  {item.icon === 'email' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="cd-label">{item.label}</div>
                  <div className="cd-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form className="contact-form" onSubmit={submit}>
          <h3 className="contact-form-title">Send a Query</h3>

          <div className="cf-row">
            <div className="cf-field">
              <label>Full Name *</label>
              <input name="name" placeholder="Your name" value={form.name} onChange={handle} />
            </div>
            <div className="cf-field">
              <label>Email *</label>
              <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handle} />
            </div>
          </div>

          <div className="cf-row">
            <div className="cf-field">
              <label>Phone</label>
              <input name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handle} />
            </div>
            <div className="cf-field">
              <label>Event Type *</label>
              <select name="eventType" value={form.eventType} onChange={handle}>
                <option value="">Select event...</option>
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="cf-field">
            <label>Event Date</label>
            <input name="eventDate" type="date" value={form.eventDate} onChange={handle} />
          </div>

          <div className="cf-field">
            <label>Message *</label>
            <textarea name="message" rows={4} placeholder="Tell us about your event, venue, special requirements..." value={form.message} onChange={handle} />
          </div>

          <button type="submit" className="btn-gold cf-submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Query'}
            {!submitting && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
