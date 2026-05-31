import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getProducts } from '../services/shopify';
import ProductCard from '../components/product/ProductCard';
import { DUMMY_PRODUCTS } from '../data/dummyProducts';
import { CATEGORY_TILES, HERO_SLIDES } from '../data/visuals';
import { subscribeToNewsletter } from '../services/klaviyo';

const REVIEWS = [
  { name: 'Sarah M.', location: 'Austin, TX', text: 'Absolutely love the quality. My daughter wore hers all summer long and it still looks brand new.', rating: 5 },
  { name: 'Jamie L.', location: 'Nashville, TN', text: 'Fast shipping and the colors are even prettier in person. I will definitely be ordering again.', rating: 5 },
  { name: 'Erin K.', location: 'Denver, CO', text: 'The matching family set was perfect for our photoshoot. We got so many compliments.', rating: 5 },
  { name: 'Dana P.', location: 'Seattle, WA', text: 'Such a sweet boutique. Every piece feels intentional and special. Love this brand.', rating: 5 },
];

const PERKS = [
  { icon: '✦', title: 'Made to Order', desc: 'Every piece crafted just for you' },
  { icon: '✦', title: 'Fast Shipping', desc: 'Ready in 3–5 business days' },
  { icon: '✦', title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: '✦', title: 'Real Support', desc: 'From real people who care' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
};

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="13" height="13" fill="#D4537E" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    getProducts({ first: 8 })
      .then((data) => setProducts(data.edges.map((e) => e.node)))
      .catch(() => setProducts(DUMMY_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((c) => (c + 1) % HERO_SLIDES.length), 6200);
    return () => window.clearInterval(timer);
  }, []);

  const displayProducts = useMemo(() => (products.length > 0 ? products : DUMMY_PRODUCTS), [products]);
  const slide = HERO_SLIDES[activeSlide];

  const goToSlide = (dir) => setActiveSlide((c) =>
    dir === 'prev' ? (c === 0 ? HERO_SLIDES.length - 1 : c - 1) : (c + 1) % HERO_SLIDES.length
  );

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailLoading(true);
    setEmailError('');
    try {
      const result = await subscribeToNewsletter(email.trim());
      if (result?.success !== false) {
        setEmailSent(true);
        setEmail('');
      } else {
        setEmailError('Something went wrong. Please try again.');
      }
    } catch {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100vh-132px)] overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.id}
            src={slide.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40"/>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-132px)] max-w-screen-2xl items-center justify-center px-5 py-16 text-center sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-5xl"
            >
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.32em' }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-6 text-[10px] font-black uppercase tracking-[0.32em] text-black/70"
              >
                {slide.eyebrow}
              </motion.p>
              <h1 className="text-balance font-serif text-[3.25rem] font-black uppercase leading-[0.88] text-black sm:text-[5.8rem] lg:text-[7.5rem]">
                {slide.title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="relative inline-block text-white">
                  {slide.title.split(' ').slice(-1)}
                  <svg className="pointer-events-none absolute -inset-x-4 -inset-y-3" viewBox="0 0 220 88" fill="none" aria-hidden="true">
                    <ellipse cx="110" cy="44" rx="100" ry="34" stroke="black" strokeWidth="4" strokeLinecap="round" transform="rotate(-7 110 44)"/>
                  </svg>
                </span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-8 text-black/75 sm:text-xl">{slide.subtitle}</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to={slide.to} className="border-2 border-black bg-white/90 px-10 py-4 text-[12px] font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white">
                  {slide.cta}
                </Link>
                <Link to="/about" className="border-b-2 border-black pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-colors hover:border-pink hover:text-pink">
                  Our Story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/85 px-4 py-2 shadow backdrop-blur">
          <button onClick={() => goToSlide('prev')} className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-black hover:text-white" aria-label="Previous">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setActiveSlide(i)} className={`h-2 rounded-full transition-all ${i === activeSlide ? 'w-7 bg-black' : 'w-2 bg-black/25'}`} aria-label={`Slide ${i + 1}`}/>
            ))}
          </div>
          <button onClick={() => goToSlide('next')} className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-black hover:text-white" aria-label="Next">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </section>

      {/* ── PERKS STRIP ── */}
      <section className="border-y border-black/8 bg-[#fdf8f5] py-7">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-6 px-6 sm:px-8 lg:grid-cols-4">
          {PERKS.map((perk) => (
            <motion.div key={perk.title} variants={fadeUp} transition={{ duration: 0.45 }} className="flex items-start gap-3">
              <span className="mt-0.5 text-lg leading-none text-pink">✦</span>
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.1em] text-navy">{perk.title}</p>
                <p className="mt-0.5 text-[11px] leading-5 text-gray-500">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CATEGORY TILES ── */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="mb-12 text-center">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-pink">Shop by category</p>
            <h2 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">Find your perfect pieces</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">Coordinated outfits for mamas, minis, and the whole family.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CATEGORY_TILES.map((cat, i) => (
              <motion.div key={cat.to} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <Link to={cat.to} className="group relative block overflow-hidden rounded-2xl bg-gray-100" style={{ aspectRatio: '3/4' }}>
                  <img src={cat.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"/>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">{cat.desc}</p>
                    <h3 className="mt-1.5 font-serif text-xl font-semibold sm:text-2xl">{cat.label}</h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 border-b border-white/60 pb-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 transition-colors group-hover:border-white group-hover:text-white">
                      Shop now
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/></svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAN FAVORITES ── */}
      <section className="bg-[#fdf8f5] py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-pink">Customer picks</p>
              <h2 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">Fan Favorites</h2>
              <p className="mt-2 text-sm text-gray-500">Our most-loved pieces right now</p>
            </div>
            <Link to="/shop" className="hidden shrink-0 border-b-2 border-navy pb-1 text-[11px] font-black uppercase tracking-[0.18em] text-navy transition-colors hover:border-pink hover:text-pink sm:inline-flex">
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-gray-200"/>)}
            </div>
          ) : (
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {displayProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product}/>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="bg-navy py-24">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-pink">Our Story</p>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Born from a<br/>mother's love<br/>
              <em className="not-italic text-pink">for her family.</em>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-white/55">
              CalAda & Co started with a simple idea: every family deserves beautiful, thoughtfully made pieces they will reach for again and again.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-pink pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-pink transition-colors hover:border-white hover:text-white">
              Read our full story →
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="grid grid-cols-3 gap-8 text-center">
            {[
              { stat: '2,000+', label: 'Happy families' },
              { stat: '100%', label: 'Made to order' },
              { stat: '5-star', label: 'Average review' },
            ].map((item) => (
              <div key={item.label} className="border-t border-white/10 pt-8">
                <p className="font-serif text-4xl font-semibold text-white sm:text-5xl">{item.stat}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/40">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── WHY CALADA ── */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-14 text-center">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-pink">Why CalAda & Co</p>
            <h2 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">4 reasons families love us</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: '01', title: 'Made to Order', desc: 'Every garment is made specifically for your family — no mass production, no warehouse stock.' },
              { num: '02', title: 'Best Value', desc: 'Boutique quality at accessible prices. Beautiful pieces that last season after season.' },
              { num: '03', title: 'New Styles Always', desc: 'Fresh drops every season — curated with real families in mind, from newborns to mamas.' },
              { num: '04', title: 'Quality You Feel', desc: 'Softer fabrics, elevated details, and care that shows in every single stitch.' },
            ].map((item, i) => (
              <motion.div key={item.num} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="group border-t-2 border-pink/30 pt-7 transition-colors hover:border-pink">
                <p className="font-serif text-5xl font-semibold text-pink/20 transition-colors group-hover:text-pink/40">{item.num}</p>
                <h3 className="mt-4 text-[13px] font-black uppercase tracking-[0.1em] text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-[#fdf8f5] py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12 text-center">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-pink">Reviews</p>
            <h2 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">Loved by families everywhere</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">Real notes from customers who live in these pieces.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((review, i) => (
              <motion.div key={review.name} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.07 }} className="rounded-2xl bg-white p-7 shadow-sm">
                <Stars count={review.rating}/>
                <p className="mt-4 mb-6 text-sm italic leading-7 text-gray-600">"{review.text}"</p>
                <div className="border-t border-black/8 pt-4">
                  <p className="text-[13px] font-bold text-navy">{review.name}</p>
                  <p className="text-[11px] text-gray-400">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EMAIL SIGNUP ── */}
      <section className="relative overflow-hidden bg-navy py-24">
        <div className="pointer-events-none absolute inset-0 opacity-5">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-pink"/>
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-pink"/>
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-xl px-5 text-center sm:px-8"
        >
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-pink">Join the family</p>
          <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
            Get 20% off<br/>your first order
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-white/55">
            Plus early access to new arrivals and exclusive members-only offers.
          </p>

          {emailSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10"
            >
              <p className="text-lg font-semibold text-pink">🎉 You're in!</p>
              <p className="mt-2 text-sm text-white/60">Check your inbox for your 20% off discount code.</p>
            </motion.div>
          ) : (
            <>
              <form
                className="mt-10 flex flex-col gap-3 sm:flex-row"
                onSubmit={handleEmailSignup}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-pink focus:bg-white/15"
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="rounded-full bg-pink px-8 py-4 text-sm font-bold text-white transition-all hover:bg-pink-dark disabled:opacity-60"
                >
                  {emailLoading ? 'Subscribing…' : 'Get 20% Off'}
                </button>
              </form>
              {emailError && (
                <p className="mt-3 text-sm text-red-400">{emailError}</p>
              )}
            </>
          )}
        </motion.div>
      </section>

    </div>
  );
}