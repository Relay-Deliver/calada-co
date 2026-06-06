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

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'YS', 'YM', 'YL', '2T', '3T', '4T'];
const AGE_GROUPS = ['Adults', 'Teens', 'Kids', 'Toddlers', 'Babies'];

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

function FilterSection({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-[#eeeeee] py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-[13px] font-bold uppercase tracking-[0.1em] text-navy"
      >
        {title}
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filter state
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [openSections, setOpenSections] = useState({ size: true, price: true, age: true });

  const sort = searchParams.get('sort') || '';

  const toggleSection = (key) => setOpenSections(s => ({ ...s, [key]: !s[key] }));
  const toggleSize = (s) => setSelectedSizes(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleAge = (a) => setSelectedAgeGroups(p => p.includes(a) ? p.filter(x => x !== a) : [...p, a]);
  const activeFilterCount = selectedSizes.length + selectedAgeGroups.length;
  const clearFilters = () => { setSelectedSizes([]); setSelectedAgeGroups([]); setPriceRange([0, 200]); };

  const sortedProducts = useMemo(() => {
    let next = [...products];
    if (sort === 'price asc' || sort === 'price desc') {
      next.sort((a, b) => {
        const aP = Number(a.priceRange?.minVariantPrice?.amount || 0);
        const bP = Number(b.priceRange?.minVariantPrice?.amount || 0);
        return sort === 'price asc' ? aP - bP : bP - aP;
      });
    }
    // Price filter
    next = next.filter(p => {
      const price = Number(p.priceRange?.minVariantPrice?.amount || 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    return next;
  }, [products, sort, priceRange]);

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

  const collectionTitle = pageTitle || (handle ? handle.replaceAll('-', ' ') : 'Shop All');
  const gridClass = { 2: 'grid-cols-2', 3: 'grid-cols-2 md:grid-cols-3', 4: 'grid-cols-2 md:grid-cols-4' }[gridCols];

  const Sidebar = () => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-black uppercase tracking-[0.15em] text-navy">Filters</p>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters} className="text-[11px] text-[#c084a0] underline font-medium">
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      <FilterSection title="Price" open={openSections.price} onToggle={() => toggleSection('price')}>
        <div className="px-1">
          <div className="flex justify-between text-[12px] text-slate-500 mb-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-[#c084a0]"
          />
          <div className="flex gap-2 mt-3">
            <input
              type="number"
              value={priceRange[0]}
              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full border border-[#eeeeee] rounded px-2 py-1 text-sm text-center outline-none focus:border-[#c084a0]"
              placeholder="Min"
            />
            <span className="text-slate-400 self-center">—</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full border border-[#eeeeee] rounded px-2 py-1 text-sm text-center outline-none focus:border-[#c084a0]"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Size" open={openSections.size} onToggle={() => toggleSection('size')}>
        <div className="flex flex-wrap gap-2">
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`min-w-[40px] rounded border px-2.5 py-1.5 text-[12px] font-medium transition-all ${
                selectedSizes.includes(s)
                  ? 'border-[#c084a0] bg-[#c084a0] text-white'
                  : 'border-[#eeeeee] text-slate-600 hover:border-[#c084a0]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Age Group" open={openSections.age} onToggle={() => toggleSection('age')}>
        <div className="flex flex-col gap-2">
          {AGE_GROUPS.map(a => (
            <label key={a} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAgeGroups.includes(a)}
                onChange={() => toggleAge(a)}
                className="w-4 h-4 accent-[#c084a0] rounded"
              />
              <span className="text-sm text-slate-600">{a}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Collection hero */}
      <div className="bg-[#fdf4f7] border-b border-[#f0d6e4] py-10 px-5 text-center">
        <h1 className="font-serif text-3xl font-semibold capitalize text-navy sm:text-4xl">
          {collectionTitle}
        </h1>
        {handle && (
          <p className="mt-2 text-sm text-slate-500">Shop our {collectionTitle.toLowerCase()} collection</p>
        )}
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-8">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#eeeeee]">
          <div className="flex items-center gap-3">
            {/* Desktop sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="hidden md:flex items-center gap-2 rounded-full border-[1.5px] border-[#eeeeee] px-4 py-2 text-[13px] font-semibold text-navy transition-colors hover:border-[#c084a0] hover:text-[#c084a0]"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c084a0] text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Mobile filter button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="flex md:hidden items-center gap-2 rounded-full border-[1.5px] border-[#eeeeee] px-4 py-2 text-[13px] font-semibold text-navy"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <p className="text-[13px] text-[#888888]">{sortedProducts.length} products</p>
          </div>

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
            <div className="hidden sm:flex items-center gap-1 border-[1.5px] border-[#eeeeee] rounded-[6px] p-1">
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setGridCols(n)}
                  className={`p-1.5 rounded transition-colors ${gridCols === n ? 'bg-navy text-white' : 'text-slate-400 hover:text-navy'}`}
                >
                  <GridIcon cols={n} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative ml-auto h-full w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <p className="text-base font-bold text-navy">Filters</p>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400 hover:text-navy">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <Sidebar />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="mt-6 w-full rounded-full bg-navy py-3 text-sm font-bold text-white"
              >
                View {sortedProducts.length} Products
              </button>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          {sidebarOpen && (
            <div className="hidden md:block w-56 shrink-0">
              <Sidebar />
            </div>
          )}

          {/* Products */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-6 h-6 border-2 border-[#FBEAF0] border-t-pink rounded-full animate-spin" />
              </div>
            ) : sortedProducts.length > 0 ? (
              <>
                <motion.div
                  className={`grid ${gridClass} gap-4 md:gap-5`}
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
                  <img src="/assets/calada-logo.png" alt="" style={{ height: 80, width: 'auto', margin: '0 auto', opacity: 0.3 }} />
                  <h2 className="font-serif text-2xl font-semibold text-navy mt-6 mb-3">Coming Soon</h2>
                  <p className="text-slate-500 text-sm leading-7 mb-6">
                    We are working on adding beautiful pieces to this collection. Check back soon!
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
      </div>
    </div>
  );
}