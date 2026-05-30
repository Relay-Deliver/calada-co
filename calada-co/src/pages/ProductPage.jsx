import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductByHandle, formatPrice } from '../services/shopify';
import { useCart } from '../context/CartContext';
import { DUMMY_PRODUCTS } from '../data/dummyProducts';
import { getFallbackImage } from '../data/visuals';

export default function ProductPage() {
  const { handle } = useParams();
  const { addItem, loading: cartLoading } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedImg, setSelectedImg] = useState(0);
  const [imageFailed, setImageFailed] = useState({});
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setImageFailed({});
    setSelectedImg(0);
    getProductByHandle(handle)
      .then((item) => setProduct(item || DUMMY_PRODUCTS.find((p) => p.handle === handle) || null))
      .catch(() => setProduct(DUMMY_PRODUCTS.find((p) => p.handle === handle) || null))
      .finally(() => setLoading(false));
  }, [handle]);

  useEffect(() => {
    if (!product?.options) return;
    const defaults = {};
    product.options.forEach((option) => {
      defaults[option.name] = option.values[0];
    });
    setSelectedOptions(defaults);
  }, [product]);

  const images = useMemo(() => product?.images?.edges?.map((e) => e.node) || [], [product]);
  const fallbackImage = getFallbackImage(product?.handle || handle);
  const selectedImage = !imageFailed[selectedImg] && images[selectedImg]?.url
    ? images[selectedImg].url
    : fallbackImage;

  const variant = useMemo(() => {
    const variants = product?.variants?.edges?.map((edge) => edge.node) || [];
    return variants.find((item) =>
      item.selectedOptions?.every((option) => selectedOptions[option.name] === option.value)
    ) || variants[0];
  }, [product, selectedOptions]);

  const price = variant?.price || product?.priceRange?.minVariantPrice;
  const comparePrice = variant?.compareAtPrice || product?.compareAtPriceRange?.minVariantPrice;
  const onSale = comparePrice?.amount && price?.amount && parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const canAdd = variant?.id && !variant.id.startsWith('dummy') && variant.availableForSale !== false;

  async function handleAddToCart() {
    if (!canAdd) return;
    await addItem(variant.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-screen-2xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-[3/4] animate-pulse rounded-[8px] bg-gray-100" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-screen-2xl px-5 py-24 text-center sm:px-8">
        <p className="text-sm text-gray-500">Product not found.</p>
        <Link to="/shop" className="mt-5 inline-flex border-b-2 border-navy pb-1 text-sm font-bold text-navy">
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto max-w-screen-2xl px-5 py-10 sm:px-8 lg:py-16"
    >
      <div className="mb-8 text-[13px] text-gray-500">
        <Link to="/shop" className="transition-colors hover:text-pink">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-navy">{product.title}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="overflow-hidden rounded-[8px] bg-gray-100">
            <img
              src={selectedImage}
              alt={images[selectedImg]?.altText || product.title}
              onError={() => setImageFailed((failed) => ({ ...failed, [selectedImg]: true }))}
              className="aspect-[3/4] h-full w-full object-cover"
            />
          </div>

          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {(images.length ? images : [{ url: fallbackImage, altText: product.title }]).map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setSelectedImg(index)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-[8px] border-2 transition-colors ${
                  selectedImg === index ? 'border-pink' : 'border-transparent'
                }`}
                aria-label={`View product image ${index + 1}`}
              >
                <img
                  src={!imageFailed[index] && image.url ? image.url : fallbackImage}
                  alt=""
                  onError={() => setImageFailed((failed) => ({ ...failed, [index]: true }))}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:pt-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-pink">CalAda & Co</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">{product.title}</h1>

          {price && (
            <div className="mt-5 flex items-baseline gap-3">
              <p className="text-2xl font-bold text-navy">{formatPrice(price.amount, price.currencyCode)}</p>
              {onSale && (
                <p className="text-base text-gray-400 line-through">
                  {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
                </p>
              )}
            </div>
          )}

          {product.options?.map((option) => (
            option.values.length > 1 && (
              <div key={option.name} className="mt-7">
                <p className="mb-3 text-sm font-bold text-navy">{option.name}</p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedOptions((current) => ({ ...current, [option.name]: value }))}
                      className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                        selectedOptions[option.name] === value
                          ? 'border-navy bg-navy text-white'
                          : 'border-gray-200 text-gray-600 hover:border-pink hover:text-pink'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!canAdd || cartLoading}
            className={`mt-8 w-full rounded-full px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
              added
                ? 'bg-emerald-600 text-white'
                : canAdd
                  ? 'bg-pink text-white hover:bg-pink-dark'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            {added ? 'Added to cart' : canAdd ? (cartLoading ? 'Adding' : 'Add to cart') : 'Preview only'}
          </button>

          <div className="mt-8 border-t border-black/10 pt-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-navy">Details</h2>
            <p className="max-w-xl text-sm leading-7 text-gray-600">
              {product.description || 'A soft, thoughtful boutique piece designed for family days, gifting, and everyday ease.'}
            </p>
          </div>

          <div className="mt-6 grid gap-3 text-sm text-gray-500 sm:grid-cols-3">
            <p>Made to order</p>
            <p>Ships in 3-5 business days</p>
            <p>Easy 30-day returns</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
