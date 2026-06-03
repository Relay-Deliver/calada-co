import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCollectionByHandle, getProducts } from '../services/shopify';
import ProductCard from '../components/product/ProductCard';
import { DUMMY_PRODUCTS } from '../data/dummyProducts';

const SORT_OPTIONS = [
  { label: 'Featured',    value: '' },
  { label: 'Price: Low',  value: 'price asc' },
  { label: 'Price: High', value: 'price desc' },
  { label: 'Newest',      value: 'created_at desc' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const COLORS = ['Black', 'White', 'Pink', 'Navy', 'Red', 'Blue', 'Green', 'Gray'];

function getFallbackProducts(handle, query) {
  let products = [...DUMMY_PRODUCTS];
  if (handle) {
    products = products.filter((p) => {
      if (handle === 'new-arrivals') return p.tags?.includes('new');
      if (handle === 'best-sellers') return p.tags?.includes('best-seller');
      if (handle === 'sale') return p.compareAtPriceRange?.minVariantPrice;
      return p.tags?.includes(handle) || p.handle?.includes(handle);
    });
  }
  if (query) {
    const s = query.toLowerCase();
    products = products.filter((p) =>
      [p.title, p.handle, ...(p.tags || [])].join(' ').toLowerCase().includes(s)
    );
  }
  return products.length > 0 ? products : DUMMY_PRODUCTS;
}

const GridIcon = ({ cols }) => {
  if (cols === 2) return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <rect x="0" y="0" width="8" height="8" rx="1"/><rect x="10" y="0" width="8" height="8" rx="1"/>
      <rect x="0" y="10" width="8" height="8" rx="1"/><rect x="10" y="10" width="8" height="8" rx="1"/>
    </svg>
  );
  if (cols === 3) return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <rect x="0" y="0" width="4" height="8" rx="1"/><rect x="7" y="0" width="4" height="8" rx="1"/><rect x="14" y="0" width="4" height="8" rx="1"/>
      <rect x="0" y="10" width="4" height="8" rx="1"/><rect x="7" y="10" width="4" height="8" rx="1"/><rect x="14" y="10" width="4" height="8" rx="1"/>
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <rect x="0" y="0" width="3" height="8" rx="1"/><rect x="5" y="0" width="3" height="8" rx="1"/><rect x="10" y="0" width="3" height="8" rx="1"/><rect x="15" y="0" width="3" height="8" rx="1"/>
      <rect x="0" y="10" width="3" height="8" rx="1"/><rect x="5" y="10" width="3" height="8" rx="1"/><rect x="10" y="10" width="3" height="8" rx="1"/><rect x="15" y="10" width="3" height="8" rx="1"/>
    </svg>
  );
};

export default function ShopPage() {
  const { handle } = useParams();
  const [products, setProducts] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [gridCols, setGridCols] = useState(3);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [openFilter, setOpenFilter] = useState('size');
  const sort = searchParams.get('sort') || '';

  const sortedProducts = useMemo(() => {
    let next = [...products];
    if (sort === 'price asc' || sort === 'price desc') {
      next.sort((a, b) => {
        const aP = Number(a.priceRange?.minVariantPrice?.amount || 0);
        const bP = Number(b.priceRange?.minVariantPrice?.amount || 0);
        return sort === 'price asc' ? aP - bP : bP - aP;
      });
    }
    return next;
  }, [products, sort]);

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    setCursor(null);
    const q = searchParams.get('q') || '';
    const request = handle
      ? getCollectionByHandle(handle, 24).then((col) => {
          if (!col) throw new Error('not found');
          setPageTitle(col.title);
          return col.products;
        })
      : getProducts({ first: 24, query: q }).then((data) => {
          setPageTitle('Shop All');
          return data;
        });

    request
      .then((data) => {
        setProducts(data.edges.map((e) => e.node));
        setHasMore(!handle && data.pageInfo.hasNextPage);
        setCursor(data.pageInfo.endCursor);
      })
      .catch(() => {
        setPageTitle(handle ? handle.replaceAll('-', ' ') : 'Shop All');
        setProducts(getFallbackProducts(handle, q));
        setHasMore(false);
      })
      .finally(() => setLoading(false));
  }, [handle, searchParams]);

  const loadMore = () => {
    const q = searchParams.get('q') || '';
    getProducts({ first: 24, after: cursor, query: q })
      .then((data) => {
        setProducts((prev) => [...prev, ...data.edges.map((e) => e.node)]);
        setHasMore(data.pageInfo.hasNextPage);
        setCursor(data.pageInfo.endCursor);
      })
      .catch(() => setHasMore(false));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const next = {};
    if (search) next.q = search;
    if (sort) next.sort = sort;
    setSearchParams(next);
  };

  const handleSort = (e) => {
    const nextSort = e.target.value;
    const next = {};
    const q = searchParams.get('q') || '';
    if (q) next.q = q;
    if (nextSort) next.sort = nextSort;
    setSearchParams(next);
  };

  const toggleSize = (s) => setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleColor = (c) => setSelectedColors((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  const clearFilters = () => { setSelectedSizes([]); setSelectedColors([]); };
  const activeFilterCount = selectedSizes.length + selectedColors.length;

  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[gridCols];

  const collectionTitle = pageTitle || (handle ? handle.replaceAll('-', ' ') : 'Shop All');

  return (
    <div className="min-h-screen bg-white">

      {/* Collection hero */}
      <div className="bg-[#fdf4f7] border-b border-[#f0d6e4] py-10 px-5 text-center">
        <h1 className="font-serif text-3xl font-semibold capitalize text-navy sm:text-4xl">
          {collectionTitle}
        </h1>
        {handle && (
          <p className="mt-2 text-sm text-slate-500">
            Shop our {collectionTitle.toLowerCase()} collection
          </p>
        )}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 py-8">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#eeeeee]">

          {/* Left — filter button + count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border-[1.5px] border-[#eeeeee] px-4 py-2 text-[13px] font-semibold text-navy transition-colors hover:border-[#c084a0] hover:text-[#c084a0]"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Filter
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c084a0] text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <p className="text-[13px] text-[#888888]">{sortedProducts.length} products</p>
          </div>

          {/* Right — sort + grid toggles */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-44 rounded-full px-3.5 py-2 border-[1.5px] border-[#eeeeee] text-sm outline-none focus:border-pink"
              />
            </form>

            <div className="flex items-center gap-1 text-[13px]">
              <span className="hidden sm:block text-[#888888] mr-1">Sort by</span>
              <select
                className="px-3 py-2 border-[1.5px] border-[#eeeeee] rounded-[6px] text-[13px] outline-none cursor-pointer"
                value={sort}
                onChange={handleSort}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Grid toggles */}
            <div className="hidden sm:flex items-center gap-1 border-[1.5px] border-[#eeeeee] rounded-[6px] p-1">
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setGridCols(n)}
                  className={`p-1.5 rounded transition-colors ${gridCols === n ? 'bg-navy text-white' : 'text-slate-400 hover:text-navy'}`}
                  aria-label={`${n} columns`}
                >
                  <GridIcon cols={n} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div className="mb-6 rounded-xl border border-[#eeeeee] bg-[#fdf4f7] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-navy uppercase tracking-[0.1em]">Filters</p>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-[13px] text-[#c084a0] underline">
                  Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Size */}
              <div>
                <button
                  className="flex w-full items-center justify-between text-[13px] font-semibold text-navy uppercase tracking-[0.08em] mb-3"
                  onClick={() => setOpenFilter(openFilter === 'size' ? null : 'size')}
                >
                  Size
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    style={{ transform: openFilter === 'size' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {openFilter === 'size' && (
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`min-w-[44px] rounded border px-3 py-1.5 text-sm font-medium transition-all ${
                          selectedSizes.includes(s)
                            ? 'border-[#c084a0] bg-[#c084a0] text-white'
                            : 'border-[#eeeeee] text-slate-600 hover:border-[#c084a0]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Color */}
              <div>
                <button
                  className="flex w-full items-center justify-between text-[13px] font-semibold text-navy uppercase tracking-[0.08em] mb-3"
                  onClick={() => setOpenFilter(openFilter === 'color' ? null : 'color')}
                >
                  Color
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    style={{ transform: openFilter === 'color' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {openFilter === 'color' && (
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleColor(c)}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                          selectedColors.includes(c)
                            ? 'border-[#c084a0] bg-[#c084a0] text-white'
                            : 'border-[#eeeeee] text-slate-600 hover:border-[#c084a0]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-6 h-6 border-2 border-[#FBEAF0] border-t-pink rounded-full animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <>
            <motion.div
              className={`grid ${gridClass} gap-4 md:gap-6`}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.06 }}
            >
              {sortedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </motion.div>
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-full text-sm font-medium transition-colors bg-transparent text-navy border-[1.5px] border-navy hover:bg-navy hover:text-white"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 px-5">
            <div className="mx-auto max-w-md">
              <div className="mb-6 text-6xl">
                <img src="/assets/calada-logo.png" alt="" style={{ height: 80, width: 'auto', margin: '0 auto', opacity: 0.3 }} />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-navy mb-3">Coming Soon</h2>
              <p className="text-slate-500 text-sm leading-7 mb-6">
                We are working on adding beautiful pieces to this collection. Check back soon or browse our other styles.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/shop" className="inline-flex items-center justify-center py-3 px-6 rounded-full text-sm font-medium bg-pink text-white hover:bg-pink-dark transition-colors">
                  Browse All Products
                </a>
                <button
                  className="inline-flex items-center justify-center py-3 px-6 rounded-full text-sm font-medium border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white transition-colors"
                  onClick={() => { setSearch(''); setSearchParams({}); }}
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}