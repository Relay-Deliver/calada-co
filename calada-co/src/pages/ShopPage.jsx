import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCollectionByHandle, getProducts } from '../services/shopify';
import ProductCard from '../components/product/ProductCard';
import { DUMMY_PRODUCTS } from '../data/dummyProducts';

const SORT_OPTIONS = [
  { label: 'Featured',     value: '' },
  { label: 'Price: Low',   value: 'price asc' },
  { label: 'Price: High',  value: 'price desc' },
  { label: 'Newest',       value: 'created_at desc' },
];

function getFallbackProducts(handle, query) {
  let products = [...DUMMY_PRODUCTS];

  if (handle) {
    products = products.filter((product) => {
      if (handle === 'new-arrivals') return product.tags?.includes('new');
      if (handle === 'best-sellers') return product.tags?.includes('best-seller');
      if (handle === 'sale') return product.compareAtPriceRange?.minVariantPrice;
      return product.tags?.includes(handle) || product.handle?.includes(handle);
    });
  }

  if (query) {
    const search = query.toLowerCase();
    products = products.filter((product) =>
      [product.title, product.handle, ...(product.tags || [])]
        .join(' ')
        .toLowerCase()
        .includes(search)
    );
  }

  return products.length > 0 ? products : DUMMY_PRODUCTS;
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
  const sort = searchParams.get('sort') || '';
  const sortedProducts = useMemo(() => {
    const next = [...products];
    if (sort === 'price asc' || sort === 'price desc') {
      next.sort((a, b) => {
        const aPrice = Number(a.priceRange?.minVariantPrice?.amount || 0);
        const bPrice = Number(b.priceRange?.minVariantPrice?.amount || 0);
        return sort === 'price asc' ? aPrice - bPrice : bPrice - aPrice;
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
      ? getCollectionByHandle(handle, 12).then((collection) => {
          if (!collection) throw new Error('Collection not found');
          setPageTitle(collection.title);
          return collection.products;
        })
      : getProducts({ first: 12, query: q }).then((data) => {
          setPageTitle('Shop All');
          return data;
        });

    request
      .then(data => {
        const fetchedProducts = data.edges.map(e => e.node);
        setProducts(fetchedProducts);
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
    getProducts({ first: 12, after: cursor, query: q })
      .then(data => {
        setProducts(prev => [...prev, ...data.edges.map(e => e.node)]);
        setHasMore(data.pageInfo.hasNextPage);
        setCursor(data.pageInfo.endCursor);
      })
      .catch(() => setHasMore(false));
  };

  const handleSearch = e => {
    e.preventDefault();
    const next = {};
    if (search) next.q = search;
    if (sort) next.sort = sort;
    setSearchParams(next);
  };

  const handleSort = e => {
    const nextSort = e.target.value;
    const next = {};
    const q = searchParams.get('q') || '';
    if (q) next.q = q;
    if (nextSort) next.sort = nextSort;
    setSearchParams(next);
  };

  return (
    <div className="py-10 pb-20">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="font-serif text-3xl font-semibold capitalize text-navy sm:text-4xl">
            {pageTitle || (handle ? handle.replaceAll('-', ' ') : 'Shop All')}
          </h1>
          <form onSubmit={handleSearch} className="flex w-full flex-col gap-2.5 sm:flex-row md:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-full px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] text-sm outline-none transition-colors focus:border-pink sm:w-64"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-pink-dark"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mb-7 flex items-center justify-between gap-3 border-b border-[#eeeeee] pb-4">
          <p className="text-[13px] text-[#888888]">{sortedProducts.length} products</p>
          <select
            className="px-3 py-2 border-[1.5px] border-[#eeeeee] rounded-[6px] text-[13px] outline-none cursor-pointer"
            value={sort}
            onChange={handleSort}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-6 h-6 border-2 border-[#FBEAF0] border-t-pink rounded-full animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 md:gap-6"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.08 }}
            >
              {sortedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </motion.div>
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-transparent text-navy border-[1.5px] border-navy hover:bg-navy hover:text-white"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 px-5 text-[#888888]">
            <p>
              No products found.{' '}
              <button
                className="text-pink underline"
                onClick={() => { setSearch(''); setSearchParams({}); }}
              >
                Clear search
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
