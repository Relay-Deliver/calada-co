import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/shopify'
import ProductCard from '../components/product/ProductCard'

const CATEGORIES = [
  { label: 'women', handle: 'women', emoji: '👗' },
  { label: 'children', handle: 'children', emoji: '🧸' },
  { label: 'family sets', handle: 'family-sets', emoji: '👨‍👩‍👧' },
  { label: 'gifts', handle: 'gifts', emoji: '🎁' },
]

const REVIEWS = [
  { text: 'Absolutely love the quality. My daughter wore hers all summer long!', name: 'Sarah M.' },
  { text: 'Fast shipping and the colors are even prettier in person. Will be ordering again!', name: 'Jamie L.' },
  { text: 'The matching family set was a huge hit at our photoshoot. So cute!', name: 'Destiny R.' },
  { text: 'Best boutique I have found online. Everything fits perfectly and feels amazing.', name: 'Taylor K.' },
]

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts({ first: 6 })
      .then(data => setProducts(data.edges.map(e => e.node)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-20 px-4 text-center">
        <span className="inline-block bg-pink text-white text-xs px-4 py-1.5 rounded-full tracking-widest mb-5">
          new arrivals just dropped
        </span>
        <h1 className="text-4xl md:text-5xl font-medium text-white leading-tight mb-4">
          made for <span className="text-pink-mid">moms</span>,<br />
          families &amp; little ones
        </h1>
        <p className="text-blue-200 text-sm mb-8 max-w-md mx-auto">
          handcrafted pieces you'll reach for again and again
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/collections/new-arrivals" className="btn-primary">shop new arrivals</Link>
          <Link to="/about" className="btn-outline">our story</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="section-title">shop by category</h2>
        <p className="section-sub">find exactly what you're looking for</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.handle}
              to={`/collections/${cat.handle}`}
              className="bg-navy-light rounded-2xl py-8 text-center hover:bg-pink-light transition-colors group"
            >
              <span className="text-3xl block mb-3">{cat.emoji}</span>
              <span className="text-sm font-medium text-navy group-hover:text-pink transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-title">fan favorites</h2>
            <p className="section-sub mb-0">our most-loved pieces right now</p>
          </div>
          <Link to="/shop" className="text-sm text-pink hover:text-pink-dark transition-colors font-medium">
            view all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 rounded-xl aspect-[3/4] mb-3" />
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">products coming soon — check back shortly!</p>
          </div>
        )}
      </section>

      {/* Values strip */}
      <section className="bg-navy py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { emoji: '🤍', title: 'made to order', desc: 'every piece crafted just for you' },
            { emoji: '📦', title: 'fast shipping', desc: 'ready in 3–5 business days' },
            { emoji: '↩️', title: 'easy returns', desc: 'hassle-free 30-day returns' },
          ].map(v => (
            <div key={v.title}>
              <span className="text-2xl block mb-2">{v.emoji}</span>
              <p className="text-white text-sm font-medium mb-1">{v.title}</p>
              <p className="text-blue-200 text-xs">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="section-title text-center">what our customers say</h2>
        <p className="section-sub text-center">real reviews from real families</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="text-pink mb-3 text-sm">★★★★★</div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">"{r.text}"</p>
              <p className="text-xs font-medium text-navy">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-pink-light py-14 px-4 text-center">
        <h2 className="text-2xl font-medium text-navy mb-2">join the CalAda family</h2>
        <p className="text-sm text-gray-500 mb-8">get 20% off your first order + early access to new arrivals</p>
        <form
          className="flex gap-2 max-w-sm mx-auto"
          onSubmit={e => { e.preventDefault(); alert('Thanks for signing up!') }}
        >
          <input
            type="email"
            required
            placeholder="your email address"
            className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-pink"
          />
          <button type="submit" className="btn-navy whitespace-nowrap">sign up</button>
        </form>
      </section>
    </div>
  )
}
