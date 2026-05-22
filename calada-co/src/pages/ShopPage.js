import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/shopify';
import ProductCard from '../components/product/ProductCard';
import './ShopPage.css';

const SORT_OPTIONS = [
  { label: 'Featured',     value: '' },
  { label: 'Price: Low',   value: 'price asc' },
  { label: 'Price: High',  value: 'price desc' },
  { label: 'Newest',       value: 'created_at desc' },
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    setCursor(null);
    const q = searchParams.get('q') || '';
    getProducts({ first: 12, query: q }).then(data => {
      setProducts(data.edges.map(e => e.node));
      setHasMore(data.pageInfo.hasNextPage);
      setCursor(data.pageInfo.endCursor);
    }).finally(() => setLoading(false));
  }, [searchParams]);

  const loadMore = () => {
    const q = searchParams.get('q') || '';
    getProducts({ first: 12, after: cursor, query: q }).then(data => {
      setProducts(prev => [...prev, ...data.edges.map(e => e.node)]);
      setHasMore(data.pageInfo.hasNextPage);
      setCursor(data.pageInfo.endCursor);
    });
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearchParams(search ? { q: search } : {});
  };

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1>Shop All</h1>
          <form onSubmit={handleSearch} className="shop-search">
            <input
              type="text" placeholder="Search products..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="form-input"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>

        <div className="shop-toolbar">
          <p className="shop-count">{products.length} products</p>
          <select className="sort-select" value={sort} onChange={e => setSearchParams({ sort: e.target.value })}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="page-loader"><div className="spinner" /></div>
        ) : products.length > 0 ? (
          <>
            <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            {hasMore && (
              <div className="load-more">
                <button className="btn btn-outline" onClick={loadMore}>Load More</button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-shop">
            <p>No products found. <button onClick={() => { setSearch(''); setSearchParams({}); }}>Clear search</button></p>
          </div>
        )}
      </div>
    </div>
  );
}
