import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BUNDLE_LIST } from '../data/bundles';
import { getCollectionByHandle } from '../services/shopify';

const ChevronRight = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function BundlesPage() {
  const [covers, setCovers] = useState({});

  useEffect(() => {
    let active = true;
    (async () => {
      const next = {};
      for (const bundle of BUNDLE_LIST) {
        try {
          const col = await getCollectionByHandle(bundle.sourceCollections[0], 4);
          const img = col?.products?.edges?.[0]?.node?.images?.edges?.[0]?.node?.url;
          if (img) next[bundle.handle] = img;
        } catch {}
      }
      if (active) setCovers(next);
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#fdf4f7] border-b border-[#f0d6e4] py-12 px-5 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#c084a0] mb-2">Bundle & Save</p>
        <h1 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">Bundles — Up to 30% Off</h1>
        <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
          Mix and match your favorite pieces. The more you add to your bundle, the more you save — discount applied automatically at checkout.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {BUNDLE_LIST.map((bundle, i) => (
            <motion.div
              key={bundle.handle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/bundles/${bundle.handle}`}
                className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#fff5f8]">
                  <img
                    src={covers[bundle.handle] || bundle.heroImage}
                    alt={bundle.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#D4537E] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                    Up to 30% Off
                  </span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
                    <h2 className="font-serif text-2xl font-semibold text-white">{bundle.title}</h2>
                    <p className="text-sm text-white/85">{bundle.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5">
                  <p className="text-sm text-slate-500">{bundle.description}</p>
                  <span className="ml-3 flex flex-shrink-0 items-center gap-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#c084a0]">
                    Build <ChevronRight />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}