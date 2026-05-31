import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { trackNewRegistration, subscribeToNewsletter } from '../services/klaviyo';

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
    <div className="flex min-h-[70vh] items-start bg-[#fbf7f9] px-4 py-10 sm:px-5 sm:py-[60px]">
      <div className="mx-auto w-full max-w-[500px] rounded-xl border border-pink-light bg-white p-5 shadow-sm sm:p-10">
        <h1 className="mb-1.5 font-serif text-3xl font-semibold text-navy">Create Account</h1>
        <p className="text-sm text-[#888888] mb-7">Join the CalAda &amp; Co family</p>

        {error && (
          <div className="bg-[#fff5f5] border border-[#fed7d7] text-[#c53030] text-[13px] px-3.5 py-2.5 rounded-[6px] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#333333]">First Name</label>
              <input
                className="w-full px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
                required
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#333333]">Last Name</label>
              <input
                className="w-full px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
                required
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#333333]">Email</label>
            <input
              className="w-full px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#333333]">Password</label>
            <input
              className="w-full px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <label className="flex items-start gap-2.5 text-[13px] text-[#555555] leading-[1.5] cursor-pointer my-1">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer accent-[#c084a0]"
              checked={form.subscribe}
              onChange={e => setForm({ ...form, subscribe: e.target.checked })}
            />
            <span>Subscribe for exclusive deals, new arrivals &amp; 10% off your first order</span>
          </label>

          <button
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-pink text-white hover:bg-pink-dark disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-[13px] text-[#888888] mt-5">
          Already have an account?{' '}
          <Link to="/account/login" className="text-pink font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
