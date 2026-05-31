import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AccountLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-start bg-[#fbf7f9] px-4 py-10 sm:px-5 sm:py-[60px]">
      <div className="mx-auto w-full max-w-[440px] rounded-xl border border-pink-light bg-white p-5 shadow-sm sm:p-10">
        <h1 className="mb-1.5 font-serif text-3xl font-semibold text-navy">Welcome Back</h1>
        <p className="text-sm text-[#888888] mb-7">Sign in to your CalAda & Co account</p>
        {error && (
          <div className="bg-[#fff5f5] border border-[#fed7d7] text-[#c53030] text-[13px] px-3.5 py-2.5 rounded-[6px] mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>
          <button
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-pink text-white hover:bg-pink-dark disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-[13px] text-[#888888] mt-5">
          Don't have an account?{' '}
          <Link to="/account/register" className="text-pink font-medium">Create one</Link>
        </p>
      </div>
    </div>
  );
}
