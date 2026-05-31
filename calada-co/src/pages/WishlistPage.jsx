import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/shopify';
import ProductCard from '../components/product/ProductCard';
import { DUMMY_PRODUCTS } from '../data/dummyProducts';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getProducts({ first: 50 })
      .then((data) => setAllProducts(data.edges.map((e) => e.node)))
      .catch(() => setAllProducts(DUMMY_PRODUCTS));
  }, []);

  const wishedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-screen-2xl px-5 py-12 sm:px-8">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-pink">My Wishlist</p>
        <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">Saved Pieces</h1>
        <p className="mt-2 text-sm text-gray-500">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
      </motion.div>

      {wishlist.length === 0 ? (
        <div className="mt-20 text-center">
          <svg className="mx-auto mb-6 text-pink/30" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p className="text-lg font-semibold text-navy">No saved items yet</p>
          <p className="mt-2 text-sm text-gray-500">Click the heart on any product to save it here</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-pink px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy">
            Start Shopping
          </Link>
        </div>
      ) : (
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }} className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {wishedProducts.length > 0
            ? wishedProducts.map((p) => <ProductCard key={p.id} product={p}/>)
            : wishlist.map((id) => <div key={id} className="aspect-[3/4] animate-pulse rounded-2xl bg-gray-100"/>)
          }
        </motion.div>
      )}
    </div>
  );
}
