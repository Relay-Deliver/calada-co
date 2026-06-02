import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { trackNewRegistration, subscribeToNewsletter } from '../services/klaviyo';

const SHOPIFY_URL = 'https://shopify.com/10007470008/account/login';

export default function AccountRegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', subscribe: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await register(form.firstName, form.lastName, form.email, form.password);
      await trackNewRegistration(form.email, form.firstName, form.lastName);
      if (form.subscribe) await subscribeToNewsletter(form.email, form.firstName);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-start bg-[#fbf7f9] px-4 py-10 sm:px-5 sm:py-[60px]">
      <div className="mx-auto w-full max-w-[440px] rounded-xl border border-pink-light bg-white p-5 shadow-sm sm:p-10">
        <h1 className="mb-1.5 font-serif text-3xl font-semibold text-navy">Join the Family</h1>
        <p className="text-sm text-[#888888] mb-7">Create your CalAda &amp; Co account</p>

        {/* Google + Apple buttons */}
        <div className="flex flex-col gap-3 mb-5">
          
            href={SHOPIFY_URL}
            className="flex w-full items-center justify-center gap-3 rounded-full border-[1.5px] border-[#eeeeee] bg-white py-2.5 px-4 text-sm font-medium text-[#333333] transition-all hover:border-[#c084a0] hover:shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </a>
          
            href={SHOPIFY_URL}
            className="flex w-full items-center justify-center gap-3 rounded-full border-[1.5px] border-[#eeeeee] bg-white py-2.5 px-4 text-sm font-medium text-[#333333] transition-all hover:border-[#c084a0] hover:shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.36.74 3.18.78 1.22-.24 2.39-.93 3.68-.84 1.55.12 2.72.72 3.47 1.84-3.18 1.86-2.43 5.98.48 7.13-.57 1.56-1.32 3.1-2.81 3.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continue with Apple
          </a>
        </div>

        {/* Divider */}
        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#eeeeee]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs font-medium uppercase tracking-widest text-[#aaaaaa]">
              or register with email
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-[#fff5f5] border border-[#fed7d7] text-[#c53030] text-[13px] px-3.5 py-2.5 rounded-[6px] mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[13px] font-medium text-[#333333]">First Name</label>
              <input
                className="w-full px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
                type="text"
                required
                value={form.firstName}
                onChange={e => setForm({...form, firstName: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[13px] font-medium text-[#333333]">Last Name</label>
              <input
                className="w-full px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
                type="text"
                required
                value={form.lastName}
                onChange={e => setForm({...form, lastName: e.target.value})}
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
              onChange={e => setForm({...form, email: e.target.value})}
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
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.subscribe}
              onChange={e => setForm({...form, subscribe: e.target.checked})}
              className="mt-0.5 h-4 w-4 accent-[#c084a0] flex-shrink-0"
            />
            <span className="text-xs leading-5 text-[#888888]">
              Subscribe for exclusive deals &amp; <strong className="text-[#c084a0]">10% off</strong> your first order
            </span>
          </label>

          <button
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-pink text-white hover:bg-pink-dark disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
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