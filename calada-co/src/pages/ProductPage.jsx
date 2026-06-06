import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductByHandle, formatPrice } from '../services/shopify';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getFallbackImage } from '../data/visuals';

/* ── colour helpers ── */
const COLOR_MAP = {
  black: '#111', white: '#fff', red: '#ef4444', blue: '#3b82f6',
  navy: '#1e3a5f', pink: '#ec4899', green: '#22c55e', yellow: '#eab308',
  purple: '#a855f7', orange: '#f97316', grey: '#9ca3af', gray: '#9ca3af',
  cream: '#fef3c7', ivory: '#fffff0', blush: '#ffb6c1', lavender: '#e6e6fa',
  sage: '#b2c9a0', teal: '#14b8a6', coral: '#ff6b6b', mint: '#98d8c8',
};
const isColorOption = (name) => /colou?r/i.test(name);
const getColorHex = (val) => {
  const key = val.toLowerCase().split(/[\s/]/)[0];
  return COLOR_MAP[key] || null;
};

/* ── icons ── */
const HeartIcon = ({ filled }) => (
  <svg width="22" height="22" fill={filled ? '#c084a0' : 'none'} stroke={filled ? '#c084a0' : 'currentColor'} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChevronRight = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const TruckIcon = () => (
  <svg width="28" height="28" fill="none" stroke="#c084a0" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" strokeLinejoin="round"/>
    <circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/>
  </svg>
);
const ReturnIcon = () => (
  <svg width="28" height="28" fill="none" stroke="#c084a0" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round"/>
    <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="28" height="28" fill="none" stroke="#c084a0" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round"/>
  </svg>
);

export default function ProductPage() {
  const { handle } = useParams();
  const { addItem, loading: cartLoading } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedImg, setSelectedImg] = useState(0);
  const [imageFailed, setImageFailed] = useState({});
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState('description');

  /* load product */
  useEffect(() => {
    setLoading(true);
    setImageFailed({});
    setSelectedImg(0);
    getProductByHandle(handle)
      .then((item) => setProduct(item || null))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [handle]);

  /* default options */
  useEffect(() => {
    if (!product?.options) return;
    const defaults = {};
    product.options.forEach((o) => { defaults[o.name] = o.values[0]; });
    setSelectedOptions(defaults);
  }, [product]);

  const images = useMemo(() => {
    const imgs = product?.images?.edges?.map((e) => e.node) || [];
    return imgs.length ? imgs : [{ url: getFallbackImage(handle), altText: handle }];
  }, [product, handle]);

  const variant = useMemo(() => {
    const variants = product?.variants?.edges?.map((e) => e.node) || [];
    return variants.find((v) =>
      v.selectedOptions?.every((o) => selectedOptions[o.name] === o.value)
    ) || variants[0];
  }, [product, selectedOptions]);

  const price = variant?.price || product?.priceRange?.minVariantPrice;
  const comparePrice = variant?.compareAtPrice || product?.compareAtPriceRange?.maxVariantPrice;
  const onSale = comparePrice?.amount && price?.amount && parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const canAdd = variant?.id && !variant.id.startsWith('dummy');
  const wishlisted = isWishlisted(product?.id || handle);

  const handleAddToCart = async () => {
    if (!canAdd) return;
    await addItem(variant.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const prevImg = () => setSelectedImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setSelectedImg((i) => (i + 1) % images.length);

  /* ── loading skeleton ── */
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex gap-3">
            <div className="hidden w-20 flex-col gap-2 lg:flex">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-square animate-pulse rounded bg-gray-100" />)}
            </div>
            <div className="aspect-[3/4] flex-1 animate-pulse rounded-lg bg-gray-100" />
          </div>
          <div className="space-y-4 pt-4">
            <div className="h-7 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-8 w-1/4 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-[#c084a0] underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-8 lg:py-12"
    >
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c084a0]">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-[#c084a0]">All Clothing</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.82fr)] lg:gap-14">

        {/* ── LEFT: Image Gallery ── */}
        <div className="flex gap-3">

          {/* Thumbnail strip — desktop only */}
          {images.length > 1 && (
            <div className="hidden w-[72px] flex-shrink-0 flex-col gap-2 lg:flex">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`overflow-hidden rounded-md border-2 transition-all ${
                    selectedImg === i ? 'border-[#c084a0]' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={imageFailed[i] ? getFallbackImage(handle) : img.url}
                    alt={img.altText || `View ${i + 1}`}
                    onError={() => setImageFailed(f => ({ ...f, [i]: true }))}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="relative flex-1 overflow-hidden rounded-lg bg-gray-50">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImg}
                src={imageFailed[selectedImg] ? getFallbackImage(handle) : images[selectedImg]?.url}
                alt={images[selectedImg]?.altText || product.title}
                onError={() => setImageFailed(f => ({ ...f, [selectedImg]: true }))}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="aspect-[3/4] w-full object-cover"
              />
            </AnimatePresence>

            {/* Prev / Next arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>
              </>
            )}

            {/* Dot indicators — mobile */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 lg:hidden">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`h-1.5 rounded-full transition-all ${selectedImg === i ? 'w-5 bg-[#c084a0]' : 'w-1.5 bg-white/70'}`}
                  />
                ))}
              </div>
            )}

            {/* Mobile thumbnail row */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                      selectedImg === i ? 'border-[#c084a0]' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={imageFailed[i] ? getFallbackImage(handle) : img.url}
                      alt={`View ${i + 1}`}
                      onError={() => setImageFailed(f => ({ ...f, [i]: true }))}
                      className="h-14 w-14 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Product Info ── */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">

          {/* Title */}
          <h1 className="text-2xl font-semibold leading-snug text-gray-900 lg:text-3xl">
            {product.title}
          </h1>

          {/* Price row */}
          <div className="flex items-baseline gap-3">
            {price && (
              <span className={`text-2xl font-bold ${onSale ? 'text-red-500' : 'text-gray-900'}`}>
                {formatPrice(price.amount, price.currencyCode)}
              </span>
            )}
            {onSale && comparePrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
              </span>
            )}
            {onSale && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-600">SALE</span>
            )}
          </div>

          <div className="rounded-lg border border-pink-light bg-[#fff8fb] px-4 py-3 text-sm leading-6 text-[#6b4352]">
            Made to order with secure checkout, easy returns, and shipping options shown before payment.
          </div>

          <hr className="border-gray-100" />

          {/* Options (size, color, etc.) */}
          {product.options?.filter((o) => o.values.length > 1).map((option) => (
            <div key={option.name}>
              <p className="mb-2.5 text-sm font-semibold uppercase tracking-widest text-gray-700">
                {option.name}
                {selectedOptions[option.name] && (
                  <span className="ml-2 font-normal normal-case text-gray-400">
                    — {selectedOptions[option.name]}
                  </span>
                )}
              </p>

              {isColorOption(option.name) ? (
                /* Color swatches */
                <div className="flex flex-wrap gap-2">
                  {option.values.map((val) => {
                    const hex = getColorHex(val);
                    const active = selectedOptions[option.name] === val;
                    return (
                      <button
                        key={val}
                        title={val}
                        onClick={() => handleOptionChange(option.name, val)}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${
                          active ? 'border-[#c084a0] scale-110 shadow-md' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={hex ? { backgroundColor: hex } : undefined}
                      >
                        {!hex && <span className="text-[9px] leading-none">{val.slice(0, 2)}</span>}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Size / other buttons */
                <div className="flex flex-wrap gap-2">
                  {option.values.map((val) => {
                    const active = selectedOptions[option.name] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleOptionChange(option.name, val)}
                        className={`min-w-[48px] rounded-md border px-3 py-2 text-sm font-medium transition-all ${
                          active
                            ? 'border-[#c084a0] bg-[#c084a0] text-white'
                            : 'border-gray-200 text-gray-700 hover:border-[#c084a0] hover:text-[#c084a0]'
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Add to Cart + Wishlist row */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!canAdd || cartLoading}
              className={`flex-1 rounded-lg py-4 text-sm font-bold uppercase tracking-wider shadow-sm transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : canAdd
                  ? 'bg-gray-900 text-white hover:bg-[#c084a0] hover:shadow-md active:scale-[0.99]'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              {added ? '✓ Added to Bag!' : cartLoading ? 'Adding…' : canAdd ? 'Add to Cart' : 'Unavailable'}
            </button>

            {/* Wishlist heart button */}
            <button
              onClick={() => toggle(product.id || handle)}
              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-all active:scale-95 ${
                wishlisted ? 'border-[#c084a0] bg-pink-50' : 'border-gray-200 hover:border-[#c084a0]'
              }`}
              aria-label="Add to wishlist"
            >
              <HeartIcon filled={wishlisted} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-gray-100 p-4">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <TruckIcon />
              <p className="text-xs font-semibold text-gray-700">Free Shipping</p>
              <p className="text-[11px] text-gray-400">Orders $79+</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ReturnIcon />
              <p className="text-xs font-semibold text-gray-700">30-Day Returns</p>
              <p className="text-[11px] text-gray-400">Hassle-free</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldIcon />
              <p className="text-xs font-semibold text-gray-700">Best Price</p>
              <p className="text-[11px] text-gray-400">Guaranteed</p>
            </div>
          </div>

          {/* Accordion sections */}
          {[
            { key: 'description', label: 'Description', content: product.description || product.descriptionHtml },
            { key: 'materials', label: 'Material & Care', content: 'Hand wash cold or machine wash gentle. Lay flat to dry. Do not bleach.' },
            { key: 'sizing', label: 'Size & Fit', content: 'Model is wearing a size S. Fits true to size. See our size guide for full measurements.' },
          ].map(({ key, label, content }) => (
            <div key={key} className="border-t border-gray-100">
              <button
                onClick={() => setOpenSection(openSection === key ? null : key)}
                className="flex w-full items-center justify-between py-4 text-sm font-semibold uppercase tracking-widest text-gray-700"
              >
                {label}
                <span className={`transition-transform duration-200 ${openSection === key ? 'rotate-180' : ''}`}>
                  <ChevronDown />
                </span>
              </button>
              <AnimatePresence>
                {openSection === key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="pb-4 text-sm leading-relaxed text-gray-500"
                      dangerouslySetInnerHTML={content ? { __html: content } : undefined}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
}
