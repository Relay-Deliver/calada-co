import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollectionByHandle } from '../services/shopify'
import ProductCard from '../components/product/ProductCard'

export default function CollectionPage() {
  const { handle } = useParams()
  const [collection, setCollection] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCollectionByHandle(handle)
      .then(setCollection)
      .catch(() => setCollection(null))
      .finally(() => setLoading(false))
  }, [handle])

  const products = collection?.products?.edges?.map(e => e.node) ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-100 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-64 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i}>
                <div className="bg-gray-100 rounded-xl aspect-[3/4] mb-3" />
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
              </div>
            ))}
          </div>
        </div>
      ) : collection ? (
        <>
          <h1 className="text-2xl font-medium text-navy mb-2">{collection.title}</h1>
          {collection.description && (
            <p className="text-sm text-gray-400 mb-8">{collection.description}</p>
          )}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className="text-sm text-gray-400 py-16 text-center">no products in this collection yet — check back soon!</p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-400 py-20">collection not found.</p>
      )}
    </div>
  )
}
