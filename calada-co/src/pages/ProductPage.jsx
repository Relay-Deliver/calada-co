import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByHandle, formatPrice } from '../services/shopify'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { handle } = useParams()
  const { addItem, loading: cartLoading } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [selectedImg, setSelectedImg] = useState(0)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProductByHandle(handle)
      .then(p => {
        setProduct(p)
        if (p?.options) {
          const defaults = {}
          p.options.forEach(opt => { defaults[opt.name] = opt.values[0] })
          setSelectedOptions(defaults)
        }
      })
      .finally(() => setLoading(false))
  }, [handle])

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-2xl aspect-square" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-100 rounded w-3/4" />
          <div className="h-6 bg-gray-100 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
        </div>
      </div>
    </div>
  )

  if (!product) return (
    <div className="text-center py-20 text-gray-400">
      <p>product not found.</p>
    </div>
  )

  const images = product.images?.edges?.map(e => e.node) ?? []

  // Find matching variant
  const variant = product.variants?.edges?.find(({ node }) =>
    node.selectedOptions.every(o => selectedOptions[o.name] === o.value)
  )?.node

  async function handleAddToCart() {
    if (!variant) return
    await addItem(variant.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        {/* Images */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-pink-light aspect-square mb-3">
            {images[selectedImg] ? (
              <img src={images[selectedImg].url} alt={images[selectedImg].altText} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">👗</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${selectedImg === i ? 'border-pink' : 'border-transparent'}`}
                >
                  <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-medium text-navy mb-2">{product.title}</h1>
          <p className="text-xl text-pink font-medium mb-6">
            {variant ? formatPrice(variant.price.amount) : formatPrice(product.priceRange.minVariantPrice.amount)}
          </p>

          {/* Options */}
          {product.options?.map(option => (
            option.values.length > 1 && (
              <div key={option.name} className="mb-5">
                <p className="text-sm font-medium text-navy mb-2">{option.name}</p>
                <div className="flex gap-2 flex-wrap">
                  {option.values.map(val => (
                    <button
                      key={val}
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: val }))}
                      className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedOptions[option.name] === val
                          ? 'bg-navy text-white border-navy'
                          : 'border-gray-200 text-gray-600 hover:border-pink hover:text-pink'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!variant?.availableForSale || cartLoading}
            className={`w-full py-3.5 rounded-full font-medium text-sm transition-colors mb-4 ${
              added
                ? 'bg-green-500 text-white'
                : variant?.availableForSale
                ? 'bg-pink hover:bg-pink-dark text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {added ? '✓ added to cart!' : !variant?.availableForSale ? 'sold out' : cartLoading ? 'adding...' : 'add to cart'}
          </button>

          {/* Description */}
          {product.description && (
            <div className="border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Made to order note */}
          <div className="mt-6 bg-pink-light rounded-xl p-4 text-sm text-navy">
            🤍 <strong>made to order</strong> — this piece is crafted just for you and ships in 3–5 business days.
          </div>
        </div>
      </div>
    </div>
  )
}
