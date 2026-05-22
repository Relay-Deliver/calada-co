import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/shopify';
import ProductCard from '../components/product/ProductCard';
import './HomePage.css';

const CATEGORIES = [
  { label: 'Women',       to: '/collections/women',       emoji: '👗' },
  { label: 'Children',    to: '/collections/children',    emoji: '🎀' },
  { label: 'Family Sets', to: '/collections/family-sets', emoji: '👨‍👩‍👧' },
  { label: 'Gifts',       to: '/collections/gifts',       emoji: '🎁' },
];

const REVIEWS = [
  { name: 'Sarah M.', text: 'Absolutely love the quality. My daughter wore hers all summer long!', rating: 5 },
  { name: 'Jamie L.', text: 'Fast shipping and the colors are even prettier in person.', rating: 5 },
  { name: 'Erin K.',  text: 'The matching family set was a huge hit at our photoshoot!', rating: 5 },
  { name: 'Dana P.',  text: 'Such a sweet boutique. Every piece feels so intentional and special.', rating: 5 },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getProducts({ first: 6 }).then(data => {
      setProducts(data.edges.map(e => e.node));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">new arrivals just dropped ✨</span>
          <h1>Made for <em>moms</em>,<br />families &amp; little ones</h1>
          <p>Handcrafted pieces you'll reach for again and again.</p>
          <div className="hero-btns">
            <Link to="/shop" className="btn btn-primary">Shop New Arrivals</Link>
            <Link to="/about" className="btn btn-outline-white">Our Story</Link>
          </div>
        </div>
        <div className="hero-bg-pattern" aria-hidden="true" />
      </section>

      {/* ── Categories ── */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-sub">Find exactly what you're looking for</p>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <Link key={cat.to} to={cat.to} className="category-card">
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-label">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Fan Favorites</h2>
              <p className="section-sub">Our most-loved pieces right now</p>
            </div>
            <Link to="/shop" className="btn btn-outline">View All</Link>
          </div>
          {loading ? (
            <div className="page-loader"><div className="spinner" /></div>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="empty-products">
              <p>Products coming soon — check back shortly! 🌸</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Values Strip ── */}
      <section className="values-strip">
        <div className="container values-grid">
          <div className="value-item">
            <span className="value-icon">🧵</span>
            <strong>Made to Order</strong>
            <p>Every piece crafted just for you</p>
          </div>
          <div className="value-item">
            <span className="value-icon">📦</span>
            <strong>Fast Shipping</strong>
            <p>Ready in 3–5 business days</p>
          </div>
          <div className="value-item">
            <span className="value-icon">↩️</span>
            <strong>Easy Returns</strong>
            <p>30-day hassle-free returns</p>
          </div>
          <div className="value-item">
            <span className="value-icon">💬</span>
            <strong>We're Here</strong>
            <p>Real support from real people</p>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title text-center">What Our Customers Say</h2>
          <p className="section-sub text-center">Real reviews from real families</p>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">{'★'.repeat(r.rating)}</div>
                <p className="review-text">"{r.text}"</p>
                <p className="reviewer">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email Signup ── */}
      <section className="email-section">
        <div className="container email-inner">
          <h2>Join the CalAda Family</h2>
          <p>Get 20% off your first order + early access to new arrivals</p>
          <form className="email-form" onSubmit={e => { e.preventDefault(); setEmail(''); alert('Thanks for signing up! 🌸'); }}>
            <input
              type="email" placeholder="your email address"
              value={email} onChange={e => setEmail(e.target.value)}
              required className="email-input"
            />
            <button type="submit" className="btn btn-navy">Sign Up</button>
          </form>
        </div>
      </section>

    </div>
  );
}
