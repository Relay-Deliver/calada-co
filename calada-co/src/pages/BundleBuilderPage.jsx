import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCollectionByHandle, getProducts, formatPrice } from '../services/shopify';
import { useCart } from '../context/CartContext';
import { BUNDLES, BUNDLE_TIERS, getTierForCount } from '../data/bundles';
import { getFallbackImage } from '../data/visuals';

export default function BundleBuilderPage() {
  const { handle } = useParams();
  const bundle = BUNDLES[handle];
  const { addItem, openCart, loading: cartLoading } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const [heroImg, setHeroImg] = useState(null);
  const [adding, setAdding] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState(null);

  // Load products from the bundle's source collections
  useEffect(() => {
    if (!bundle) { setLoading(false); return; }
    let active = true;
    setLoading(true);
    (async () => {
      const map = new Map();
      for (const colHandle of bundle.sourceCollections) {
        try {
          const col = await getCollectionByHandle(colHandle, 50);
          const nodes = col?.products?.edges?.map(e => e.node) || [];
          let list = nodes;
          if (!list.length) {
            const data = await getProducts({ first: 50, query: `tag:${colHandle} OR ${colHandle.replaceAll('-', ' ')}` });
            list = data.edges.map(e => e.node);
          }
          list.forEach(p => map.set(p.id, p));
        } catch {}
      }
      if (active) {
        const arr = [...map.values()];
        setProducts(arr);
        if (arr[0]?.images?.edges?.[0]?.node?.url) setHeroImg(arr[0].images.edges[0].node.url);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [handle]);

  // "You may also like"
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getProducts({ first: 8 });
        if (active) setSuggestions(data.edges.map(e => e.node).slice(0, 4));
      } catch {}
    })();
    return () => { active = false; };
  }, [handle]);

  const firstVariant = (p) => p?.variants?.edges?.[0]?.node;

  const addToBundle = (product) => {
    const v = firstVariant(product);
    if (!v) return;
    setSelected(prev => {
      const existing = prev[v.id];
      return { ...prev, [v.id]: { product, variant: v, qty: (existing?.qty || 0) + 1 } };
    });
    const img = product.images?.edges?.[0]?.node?.url;
    if (img) setHeroImg(img);
  };

  const decFromBundle = (variantId) => {
    setSelected(prev => {
      const entry = prev[variantId];
      if (!entry) return prev;
      if (entry.qty <= 1) {
        const next = { ...prev };
        delete next[variantId];
        return next;
      }
      return { ...prev, [variantId]: { ...entry, qty: entry.qty - 1 } };
    });
  };

  const selectedList = Object.values(selected);
  const itemCount = selectedList.reduce((sum, e) => sum + e.qty, 0);
  const subtotal = selectedList.reduce(
    (sum, e) => sum + parseFloat(e.variant.price.amount) * e.qty, 0
  );
  const tier = getTierForCount(itemCount);
  const currency = selectedList[0]?.variant.price.currencyCode || 'USD';

  const handleAddBundleToCart = async () => {
    if (!selectedList.length || cartLoading) return;
    setAdding(true);
    try {
      for (const entry of selectedList) {
        for (let i = 0; i < entry.qty; i++) {
          await addItem(entry.variant.id, [{ key: 'Bundle', value: bundle.title }]);
        }
      }
      openCart();
    } catch {}
    setAdding(false);
  };

  if (!bundle) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-gray-500">Bundle not found.</p>
        <Link to="/bundles" className="mt-4 inline-block text-sm font-semibold text-[#c084a0] underline">View all bundles</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-8 lg:py-12">

        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#c084a0]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/bundles" className="hover:text-[#c084a0]">Bundles</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{bundle.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.85fr)] lg:gap-12">

          {/* LEFT — hero image */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-xl bg-gray-50 aspect-[4/5]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={heroImg || bundle.heroImage}
                  src={heroImg || bundle.heroImage}
                  alt={bundle.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — builder */}
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-navy">{bundle.title}</h1>
              <p className="mt-1 text-sm text-slate-500">{bundle.description}</p>
            </div>

            {/* Discount tiers */}
            <div className="grid grid-cols-3 gap-2">
              {BUNDLE_TIERS.map((t) => {
                const active = tier?.label === t.label;
                return (
                  <div key={t.label}
                    className={`rounded-lg border-2 p-2.5 text-center transition-all ${active ? 'border-[#D4537E] bg-pink-50' : 'border-gray-200'}`}>
                    <p className={`text-xs font-semibold ${active ? 'text-[#c084a0]' : 'text-gray-600'}`}>{t.label}</p>
                    <p className={`text-sm font-bold ${active ? 'text-[#D4537E]' : 'text-gray-400'}`}>{t.off}</p>
                  </div>
                );
              })}
            </div>

            {/* Product list to add */}
            <div className="rounded-xl border border-gray-100">
              <p className="border-b border-gray-100 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Add items to your bundle
              </p>
              <div className="max-h-[420px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#FBEAF0] border-t-[#c084a0]" />
                  </div>
                ) : products.length ? (
                  products.map((p) => {
                    const v = firstVariant(p);
                    const img = p.images?.edges?.[0]?.node?.url || getFallbackImage(p.handle);
                    const inBundle = selected[v?.id]?.qty || 0;
                    return (
                      <div key={p.id} className="flex items-center gap-3 border-b border-gray-50 px-4 py-3 last:border-0">
                        <img src={img} alt={p.title} className="h-14 w-14 flex-shrink-0 rounded-md object-cover bg-gray-50" />
                        <div className="min-w-0 flex-1">
                          <Link to={`/products/${p.handle}`} className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-[#c084a0]">
                            {p.title}
                          </Link>
                          <p className="text-sm text-gray-500">
                            {formatPrice(p.priceRange?.minVariantPrice?.amount, p.priceRange?.minVariantPrice?.currencyCode)}
                          </p>
                        </div>
                        {inBundle > 0 ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => decFromBundle(v.id)} className="grid h-7 w-7 place-items-center rounded-full border border-gray-200 text-gray-600 hover:border-[#c084a0] hover:text-[#c084a0]">-</button>
                            <span className="w-5 text-center text-sm font-semibold">{inBundle}</span>
                            <button onClick={() => addToBundle(p)} className="grid h-7 w-7 place-items-center rounded-full border border-gray-200 text-gray-600 hover:border-[#c084a0] hover:text-[#c084a0]">+</button>
                          </div>
                        ) : (
                          <button onClick={() => addToBundle(p)}
                            className="flex-shrink-0 rounded-md bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#c084a0]">
                            Add
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="px-4 py-10 text-center text-sm text-gray-400">No products available for this bundle yet.</p>
                )}
              </div>
            </div>

            {/* Running total */}
            <div className="rounded-xl bg-[#fff8fb] border border-pink-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Bundle Subtotal · {itemCount} item{itemCount === 1 ? '' : 's'}</p>
                  <p className="text-2xl font-bold text-navy">{subtotal > 0 ? formatPrice(subtotal, currency) : '—'}</p>
                </div>
                {tier && (
                  <span className="rounded-full bg-[#D4537E] px-3 py-1 text-xs font-bold text-white">{tier.off} at checkout</span>
                )}
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                Bundle discount is applied automatically at checkout.
              </p>
            </div>

            <button
              onClick={handleAddBundleToCart}
              disabled={!itemCount || adding}
              className={`rounded-lg py-4 text-sm font-bold uppercase tracking-wider shadow-sm transition-all ${
                itemCount ? 'bg-gray-900 text-white hover:bg-[#c084a0] active:scale-[0.99]' : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              {adding ? 'Adding...' : itemCount ? `Add Bundle to Cart (${itemCount})` : 'Add items to get started'}
            </button>
          </div>
        </div>

        {/* You may also like */}
        {suggestions.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-5 text-center text-sm font-black uppercase tracking-[0.18em] text-navy">You May Also Like</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {suggestions.map((p) => {
                const img = p.images?.edges?.[0]?.node?.url || getFallbackImage(p.handle);
                const v = firstVariant(p);
                const justAdded = recentlyAdded === p.id;
                return (
                  <div key={p.id} className="group overflow-hidden rounded-lg border border-slate-100">
                    <Link to={`/products/${p.handle}`} className="block aspect-square overflow-hidden bg-gray-50">
                      <img src={img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                    <div className="p-3">
                      <Link to={`/products/${p.handle}`} className="line-clamp-1 text-sm font-medium text-gray-800 hover:text-[#c084a0]">{p.title}</Link>
                      <p className="text-sm text-gray-500">
                        {formatPrice(p.priceRange?.minVariantPrice?.amount, p.priceRange?.minVariantPrice?.currencyCode)}
                      </p>
                      <button
                        onClick={() => { addToBundle(p); setRecentlyAdded(p.id); setTimeout(() => setRecentlyAdded(null), 1500); }}
                        disabled={!v}
                        className={`mt-2 w-full rounded-md border py-1.5 text-xs font-semibold transition-all ${
                          justAdded
                            ? 'border-green-500 bg-green-50 text-green-600'
                            : v
                            ? 'border-gray-200 text-gray-700 hover:border-[#c084a0] hover:text-[#c084a0]'
                            : 'border-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {justAdded ? '✓ Added to bundle' : v ? 'Add to bundle' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}