import { useState } from 'react';
import './ContactPage.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="contact-sub">We'd love to hear from you. We typically respond within 24 hours.</p>
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-item"><span>📧</span><a href="mailto:hello@caladaco.com">hello@caladaco.com</a></div>
            <div className="contact-item"><span>⏱️</span><p>Mon–Fri, 9am–5pm EST</p></div>
            <div className="contact-item"><span>📦</span><p>Orders ready in 3–5 business days</p></div>
          </div>
          {sent ? (
            <div className="contact-thanks">
              <span>🌸</span>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows={5} required value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              <button className="btn btn-primary" type="submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
