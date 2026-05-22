import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../services/shopify'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const images = product.images?.edges ?? []
  const img1 = images[0]?.node
  const img2 = images[1]?.node
  const price = product.priceRange?.minVariantPrice
  const isBestSeller = product.tags?.includes('best-seller')
  const isNew = product.tags?.includes('new')

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-pink-light aspect-[3/4] mb-3">
        {img1 && (
          <img
            src={hovered && img2 ? img2.url : img1.url}
            alt={img1.altText || product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {!img1 && (
          <div className="w-full h-full flex items-center justify-center text-4xl">👗</div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isBestSeller && <span className="badge">best seller</span>}
          {isNew && <span className="badge">new</span>}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-sm font-medium text-navy group-hover:text-pink transition-colors line-clamp-2 mb-1">
          {product.title}
        </h3>
        {price && (
          <p className="text-sm text-pink font-medium">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        )}
      </div>
    </Link>
  )
}
