import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice, isBestSeller, isNew } from '../../services/shopify';
import { useCart } from '../../context/CartContext';
import { getFallbackImage } from '../../data/visuals';

const cardMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductCard({ product }) {
  const { addItem, loading } = useCart();
  const [primaryFailed, setPrimaryFailed] = useState(false);
  const [secondaryFailed, setSecondaryFailed] = useState(false);
  const images = product.images?.edges?.map((e) => e.node) || [];
  const price = product.priceRange?.minVariantPrice;
  const comparePrice = product.compareAtPriceRange?.minVariantPrice;
  const onSale = comparePrice?.amount && price?.amount
    && parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const bestSeller = isBestSeller(product);
  const newArrival = isNew(product);
  const firstVariant = product.variants?.edges?.[0]?.node;
  const firstVariantId = firstVariant?.id;
  const canQuickAdd = Boolean(firstVariantId) && !firstVariantId.startsWith('dummy') && firstVariant?.availableForSale !== false;
  const fallbackImage = getFallbackImage(product.handle || product.id);
  const primaryImage = !primaryFailed && images[0]?.url ? images[0].url : fallbackImage;
  const secondaryImage = !secondaryFailed && images[1]?.url ? images[1].url : null;

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!canQuickAdd) return;
    try {
      await addItem(firstVariantId);
    } catch {
      // Storefront credentials may be missing in local development.
    }
  };

  return (
    <motion.div
      variants={cardMotion}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group"
    >
      <Link
        to={`/products/${product.handle}`}
        className="block relative aspect-[3/4] overflow-hidden rounded-[8px] bg-gray-100"
      >
        <img
          src={primaryImage}
          alt={images[0]?.altText || product.title}
          onError={() => setPrimaryFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={images[1]?.altText || `${product.title} alternate view`}
            onError={() => setSecondaryFailed(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {bestSeller && (
            <span className="rounded-full bg-pink px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
              Best Seller
            </span>
          )}
          {newArrival && (
            <span className="rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
              New
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
              Sale
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full p-3 transition-transform duration-300 ease-out group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            disabled={!canQuickAdd || loading}
            className="w-full rounded-full bg-white py-2.5 text-[13px] font-bold text-navy shadow transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-white/85 disabled:text-gray-400"
          >
            {canQuickAdd ? (loading ? 'Adding...' : 'Quick Add') : 'View Details'}
          </button>
        </div>
      </Link>

      <div className="mt-3 space-y-1">
        <Link
          to={`/products/${product.handle}`}
          className="block text-sm font-semibold leading-snug text-navy transition-colors hover:text-pink"
        >
          {product.title}
        </Link>
        <div className="flex items-baseline gap-2">
          {price && (
            <span className="text-sm font-bold text-navy">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
          )}
          {onSale && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
