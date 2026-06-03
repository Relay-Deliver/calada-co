import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice, isBestSeller, isNew } from '../../services/shopify';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { getFallbackImage } from '../../data/visuals';

const cardMotion = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function ProductCard({ product }) {
  const { addItem, loading } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [primaryFailed, setPrimaryFailed] = useState(false);
  const [secondaryFailed, setSecondaryFailed] = useState(false);
  const [added, setAdded] = useState(false);
  const [shared, setShared] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const images = product.images?.edges?.map((e) => e.node) || [];
  const price = product.priceRange?.minVariantPrice;
  const comparePrice = product.compareAtPriceRange?.minVariantPrice;
  const onSale = comparePrice?.amount && price?.amount &&
    parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const bestSeller = isBestSeller(product);
  const newArrival = isNew(product);
  const firstVariant = product.variants?.edges?.[0]?.node;
  const firstVariantId = firstVariant?.id;
  const canQuickAdd = Boolean(firstVariantId) && !firstVariantId.startsWith('dummy');
  const fallbackImage = getFallbackImage(product.handle || product.id);
  const primaryImage = !primaryFailed && images[0]?.url ? images[0].url : fallbackImage;
  const secondaryImage = !secondaryFailed && images[1]?.url ? images[1].url : null;

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!canQuickAdd || loading) return;
    try {
      await addItem(firstVariantId);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch {}
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/products/${product.handle}`;
    if (navigator.share) {
      navigator.share({ title: product.title, url });
    } else {
      navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <motion.div
      variants={cardMotion}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group"
    >
      {/* Image container */}
      <Link
        to={`/products/${product.handle}`}
        className="relative block aspect-[3/4] overflow-hidden rounded-lg bg-[#fdf4f7]"
      >
        {/* Primary image */}
        <img
          src={primaryImage}
          alt={images[0]?.altText || product.title}
          onError={() => setPrimaryFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.035] ${
            secondaryImage ? 'group-hover:opacity-35' : 'group-hover:opacity-95'
          }`}
        />

        {/* Secondary image on hover */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={images[1]?.altText || `${product.title} alternate`}
            onError={() => setSecondaryFailed(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.035] group-hover:opacity-95"
          />
        )}

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
        </div>

        {/* Badges — top left */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
          {bestSeller && (
            <span className="rounded-full bg-[#c084a0] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
              Best Seller
            </span>
          )}
          {newArrival && (
            <span className="rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
              New
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Heart + Share — top right */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-2 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
          <button
            onClick={handleWishlist}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform active:scale-95 hover:scale-110"
            aria-label="Add to wishlist"
          >
            <svg width="16" height="16" fill={wishlisted ? '#c084a0' : 'none'} stroke={wishlisted ? '#c084a0' : '#666'} strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform active:scale-95 hover:scale-110"
            aria-label="Share product"
          >
            {shared ? (
              <svg width="15" height="15" fill="none" stroke="#22c55e" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            ) : (
              <svg width="15" height="15" fill="none" stroke="#666" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <path strokeLinecap="round" d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
              </svg>
            )}
          </button>
        </div>

        {/* Add to Cart button */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-2 sm:translate-y-full sm:p-2.5 sm:transition-transform sm:duration-300 sm:ease-out sm:group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            disabled={!canQuickAdd || loading}
            className={`w-full rounded-full py-2 text-[11px] font-bold shadow-lg transition-colors sm:py-2.5 sm:text-[12px] ${
              added
                ? 'bg-emerald-500 text-white'
                : canQuickAdd
                ? 'bg-white text-gray-900 hover:bg-[#c084a0] hover:text-white active:scale-95'
                : 'cursor-not-allowed bg-white/80 text-gray-400'
            }`}
          >
            {added ? 'Added!' : canQuickAdd ? (loading ? 'Adding...' : 'Add to Cart') : 'View Details'}
          </button>
        </div>
      </Link>

      {/* Product info */}
      <div className="mt-2.5 space-y-1 px-0.5">
        <Link
          to={`/products/${product.handle}`}
          className="block min-h-[2.55rem] text-[13px] font-semibold leading-snug text-gray-900 transition-colors hover:text-[#c084a0] sm:text-sm"
        >
          {product.title}
        </Link>
        <div className="flex items-baseline gap-2">
          {price && (
            <span className="text-sm font-bold text-gray-900">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
          )}
          {onSale && comparePrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
