import { useEffect, useState } from 'react'
import { getProducts } from '../services/shopify'
import ProductCard from '../components/product/ProductCard'

const FILTERS = ['all', 'new', 'best-seller', 'women', 'children', 'family-sets']

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setLoading(true)
    const query = filter === 'all' ? '' : `tag:${filter}`
    getProducts({ first: 24, query })
      .then(data => setProducts(data.edges.map(e => e.node)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-medium text-navy mb-2">shop all</h1>
      <p className="text-sm text-gray-400 mb-8">handcrafted pieces for every occasion</p>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f
                ? 'bg-navy text-white border-navy'
                : 'border-gray-200 text-gray-500 hover:border-pink hover:text-pink'
            }`}
          >
            {f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 rounded-xl aspect-[3/4] mb-3" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-sm">no products found — check back soon!</p>
        </div>
      )}
    </div>
  )
}
