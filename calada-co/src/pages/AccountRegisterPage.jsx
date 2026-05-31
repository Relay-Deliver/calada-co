import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { trackNewRegistration, subscribeToNewsletter } from '../services/klaviyo';
import './AccountPage.css';

export default function AccountRegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', subscribe: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.firstName, form.lastName, form.email, form.password);

      // Always track registration — triggers welcome email in Klaviyo
      await trackNewRegistration(form.email, form.firstName, form.lastName);

      // If they checked subscribe, also add to newsletter list
      if (form.subscribe) {
        await subscribeToNewsletter(form.email, form.firstName);
      }

      navigate('/account');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <h1>Create Account</h1>
        <p className="account-sub">Join the CalAda &amp; Co family 🌸</p>

        {error && <div className="account-error">{error}</div>}

        <form onSubmit={handleSubmit} className="account-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                className="form-input"
                required
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                className="form-input"
                required
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Newsletter opt-in */}
          <label className="subscribe-check">
            <input
              type="checkbox"
              checked={form.subscribe}
              onChange={e => setForm({ ...form, subscribe: e.target.checked })}
            />
            <span>Subscribe for exclusive deals, new arrivals &amp; 10% off your first order</span>
          </label>

          <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="account-switch">
          Already have an account? <Link to="/account/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}