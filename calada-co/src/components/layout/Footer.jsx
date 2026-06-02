import { useState } from 'react';
import { Link } from 'react-router-dom';
import PaymentMethods from '../cart/PaymentMethods';

const SHOP_LINKS = [
  { label: 'New Arrivals',  to: '/collections/new-arrivals' },
  { label: 'Sports',        to: '/collections/baseball-softball' },
  { label: 'Seasons',       to: '/collections/summer' },
  { label: 'Lifestyle',     to: '/collections/moms' },
  { label: 'Family Sets',   to: '/collections/family-sets' },
];

const HELP_LINKS = [
  { label: 'FAQ',              to: '/about#faq' },
  { label: 'Shipping & Returns', to: '/shipping' },
  { label: 'Privacy Policy',  to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Contact Us',      to: '/contact' },
];

const ABOUT_LINKS = [
  { label: 'Our Story',  to: '/about' },
  { label: 'My Account', to: '/account' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <Link to="/" className="block mb-4">
              <img src="/assets/calada-logo.png" alt="CalAda & Co." style={{ height: 52, width: 'auto' }} />
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[220px]">
              Boutique apparel for mothers, families &amp; little ones. Made with love, crafted to order.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-pink hover:text-white transition-colors"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-pink hover:text-white transition-colors"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] font-semibold text-pink-mid tracking-[0.1em] uppercase mb-5">Shop</h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[11px] font-semibold text-pink-mid tracking-[0.1em] uppercase mb-5">Help</h4>
            <ul className="space-y-3">
              {HELP_LINKS.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] font-semibold text-pink-mid tracking-[0.1em] uppercase mb-5">Stay Connected</h4>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              Get 15% off your first order when you join our community.
            </p>
            {submitted ? (
              <p className="text-sm text-pink-mid font-medium">Thanks for joining!</p>
            ) : (
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm rounded-full px-4 py-2.5 outline-none focus:border-pink transition-colors"
                />
                <button
                  type="submit"
                  className="bg-pink text-white text-sm font-semibold rounded-full px-4 py-2.5 hover:bg-pink-dark transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 pt-8 text-[12px] text-white/25 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} CalAda &amp; Co. All rights reserved.</p>
          <div className="flex flex-col gap-3 sm:items-end">
            <PaymentMethods className="[&_p]:text-white/30 [&_span]:border-white/10 [&_span]:bg-white/10 [&_span]:text-white/60" />
            <p>Made with love &middot; Every piece crafted to order</p>
          </div>
        </div>
      </div>
    </footer>
  );
}