import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
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
  { title: 'Made to Order', desc: 'Every piece crafted just for you' },
  { title: 'Fast Shipping', desc: 'Ready in 3-5 business days' },
  { title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { title: 'Real Support', desc: 'From real people who care' },
];

const STORY_STATS = [
  { value: 2000, suffix: '+', label: 'Happy families' },
  { value: 100, suffix: '%', label: 'Made to order' },
  { value: 5, suffix: '-star', label: 'Average review' },
];

const BANNER_GRID = [
  {
    title: 'Sports',
    subtitle: 'Rep your team in style',
    to: '/collections/baseball-softball',
    image: '/assets/hero/porch-family.png',
    align: 'left',
  },
  {
    title: 'Seasons',
    subtitle: 'Dressed for every holiday',
    to: '/collections/summer',
    image: '/assets/hero/flower-market.png',
    align: 'center',
  },
  {
    title: 'Michigan Made',
    subtitle: 'Small town, big style',
    to: '/collections/michigan-made',
    image: '/assets/hero/boutique-rack.png',
    align: 'right',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 46, scale: 0.96, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.04 } },
};

const springReveal = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
  mass: 0.8,
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

function AnimatedStat({ value, suffix = '', label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const count = useMotionValue(0);
  const display = useTransform(count, latest => {
    const rounded = Math.round(latest);
    return `${rounded.toLocaleString('en-US')}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return undefined;
    const controls = animate(count, value, {
      duration: 1.35,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, delay, isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      transition={{ ...springReveal, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="border-t border-white/10 pt-6 sm:pt-8"
    >
      <motion.p className="font-serif text-2xl font-semibold text-white sm:text-5xl">
        {display}
      </motion.p>
      <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:mt-3 sm:text-[10px]">{label}</p>
    </motion.div>
  );
}

function ProductCarousel({ products }) {
  const [index, setIndex] = useState(0);
  const perPage = 4;
  const total = products.length;
  const maxIndex = Math.max(0, total - perPage);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{ x: `calc(-${index * (100 / perPage)}% - ${index * (16 / perPage)}px)` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ width: `${(total / perPage) * 100}%` }}
        >
          {products.map((product) => (
            <div key={product.id} style={{ width: `${100 / total}%` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Arrows */}
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-md border border-gray-100 transition-colors hover:bg-navy hover:text-white"
          aria-label="Previous"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6"/>
          </svg>
        </button>
      )}
      {index < maxIndex && (
        <button
          onClick={next}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-md border border-gray-100 transition-colors hover:bg-navy hover:text-white"
          aria-label="Next"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      )}

      {/* Dots */}
      {total > perPage && (
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-navy' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>
      )}
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
    getProducts({ first: 12 })
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

      {/* HERO */}
      <section className="relative min-h-[560px] overflow-hidden bg-[#f5e9f0] sm:min-h-[calc(100vh-132px)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.id}
            src={slide.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/50"/>

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-screen-2xl items-center justify-center px-5 py-16 text-center sm:min-h-[calc(100vh-132px)] sm:px-8">
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
                className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-black/70 sm:mb-6"
              >
                {slide.eyebrow}
              </motion.p>
              <h1 className="text-balance break-words font-serif text-[2.35rem] font-black uppercase leading-[0.92] text-black sm:text-[5.8rem] lg:text-[7.5rem]">
                {slide.title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="relative inline-block text-white">
                  {slide.title.split(' ').slice(-1)}
                  <svg className="pointer-events-none absolute -inset-x-2 -inset-y-2 sm:-inset-x-4 sm:-inset-y-3" viewBox="0 0 220 88" fill="none" aria-hidden="true">
                    <ellipse cx="110" cy="44" rx="100" ry="34" stroke="black" strokeWidth="4" strokeLinecap="round" transform="rotate(-7 110 44)"/>
                  </svg>
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-black/75 sm:mt-7 sm:text-xl">
                {slide.subtitle}
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                <Link
                  to={slide.to}
                  className="w-full max-w-[320px] border-2 border-black bg-white/90 px-4 py-3.5 text-center text-[11px] font-black uppercase tracking-[0.14em] text-black transition-all hover:bg-black hover:text-white sm:w-auto sm:px-10 sm:py-4 sm:text-[12px] sm:tracking-[0.2em]"
                >
                  {slide.cta}
                </Link>
                <Link
                  to="/about"
                  className="border-b-2 border-black pb-1 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-colors hover:border-pink hover:text-pink"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/85 px-3 py-1.5 shadow backdrop-blur sm:bottom-6 sm:px-4 sm:py-2">
          <button onClick={() => goToSlide('prev')} className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-black hover:text-white sm:h-8 sm:w-8" aria-label="Previous">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setActiveSlide(i)} className={`h-2 rounded-full transition-all ${i === activeSlide ? 'w-6 bg-black' : 'w-2 bg-black/25'}`} aria-label={`Slide ${i + 1}`}/>
            ))}
          </div>
          <button onClick={() => goToSlide('next')} className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-black hover:text-white sm:h-8 sm:w-8" aria-label="Next">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </section>

      {/* PERKS STRIP */}
      <section className="border-y border-black/8 bg-[#fdf8f5] py-6 sm:py-7">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-4 px-5 sm:px-8 lg:grid-cols-4 lg:gap-6"
        >
          {PERKS.map((perk) => (
            <motion.div key={perk.title} variants={fadeUp} transition={springReveal} whileHover={{ y: -3 }} className="flex items-start gap-3">
              <span className="mt-0.5 text-lg leading-none text-pink">✦</span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-navy sm:text-[12px]">{perk.title}</p>
                <p className="mt-0.5 text-[11px] leading-5 text-gray-500">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CATEGORY TILES */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={springReveal}
            className="mb-8 text-center sm:mb-12"
          >
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-pink sm:mb-3">Shop by category</p>
            <h2 className="font-serif text-3xl font-semibold text-navy sm:text-5xl">Find your perfect pieces</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-500 sm:mt-3">Coordinated outfits for mamas, minis, and the whole family.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {CATEGORY_TILES.map((cat, i) => (
              <motion.div key={cat.to} variants={fadeUp} transition={{ ...springReveal, delay: i * 0.04 }} whileHover={{ y: -8, scale: 1.015 }}>
                <Link to={cat.to} className="group relative block overflow-hidden rounded-xl bg-gray-100 sm:rounded-2xl" style={{ aspectRatio: '3/4' }}>
                  <img src={cat.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"/>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60 sm:text-[10px]">{cat.desc}</p>
                    <h3 className="mt-1 font-serif text-lg font-semibold sm:mt-1.5 sm:text-2xl">{cat.label}</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 border-b border-white/60 pb-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/80 transition-colors group-hover:border-white group-hover:text-white sm:mt-3 sm:text-[10px]">
                      Shop now
                      <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/></svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3-COLUMN BANNER GRID */}
      <section className="py-4 sm:py-6">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {BANNER_GRID.map((banner, i) => (
              <Link
                key={banner.title}
                to={banner.to}
                className="group relative block overflow-hidden"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className={`absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white ${
                  banner.align === 'center' ? 'text-center' : banner.align === 'right' ? 'text-right' : 'text-left'
                }`}>
                  <h3 className="font-serif text-3xl font-semibold italic sm:text-4xl">{banner.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{banner.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-2 border-b border-white/60 pb-0.5 text-[11px] font-black uppercase tracking-[0.18em] text-white/80 transition-colors group-hover:border-white group-hover:text-white">
                    Shop now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS CAROUSEL */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-pink sm:mb-3">Just landed</p>
              <h2 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">New Arrivals</h2>
            </div>
            <Link to="/collections/new-arrivals" className="hidden shrink-0 border-b-2 border-navy pb-1 text-[11px] font-black uppercase tracking-[0.18em] text-navy transition-colors hover:border-pink hover:text-pink sm:inline-flex">
              View all
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-gray-200"/>)}
            </div>
          ) : (
            <ProductCarousel products={displayProducts.slice(0, 8)} />
          )}
        </div>
      </section>

      {/* FAN FAVORITES */}
      <section className="bg-[#fdf8f5] py-14 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-12">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-pink sm:mb-3">Customer picks</p>
              <h2 className="font-serif text-3xl font-semibold text-navy sm:text-5xl">Fan Favorites</h2>
              <p className="mt-1 text-sm text-gray-500 sm:mt-2">Our most-loved pieces right now</p>
            </div>
            <Link to="/shop" className="hidden shrink-0 border-b-2 border-navy pb-1 text-[11px] font-black uppercase tracking-[0.18em] text-navy transition-colors hover:border-pink hover:text-pink sm:inline-flex">
              View all
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-gray-200"/>)}
            </div>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
            >
              {displayProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product}/>
              ))}
            </motion.div>
          )}
          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop" className="inline-flex border-b-2 border-navy pb-1 text-[11px] font-black uppercase tracking-[0.18em] text-navy">
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-navy py-16 sm:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16"
        >
          <motion.div variants={fadeUp} transition={springReveal}>
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-pink sm:mb-5">Our Story</p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Born from a<br/>mother's love<br/>
              <em className="not-italic text-pink">for her family.</em>
            </h2>
            <p className="mt-5 max-w-lg text-[14px] leading-8 text-white/55 sm:mt-6 sm:text-[15px]">
              CalAda & Co started with a simple idea: every family deserves beautiful, thoughtfully made pieces they will reach for again and again.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 border-b border-pink pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-pink transition-colors hover:border-white hover:text-white sm:mt-8">
              Read our full story
            </Link>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-3 gap-4 text-center sm:gap-8">
            {STORY_STATS.map((item, i) => (
              <AnimatedStat key={item.label} value={item.value} suffix={item.suffix} label={item.label} delay={i * 0.12} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* WHY CALADA */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={springReveal}
            className="mb-10 text-center sm:mb-14"
          >
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-pink sm:mb-3">Why CalAda & Co</p>
            <h2 className="font-serif text-3xl font-semibold text-navy sm:text-5xl">4 reasons families love us</h2>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4"
          >
            {[
              { num: '01', title: 'Made to Order', desc: 'Every garment is made specifically for your family — no mass production, no warehouse stock.' },
              { num: '02', title: 'Best Value', desc: 'Boutique quality at accessible prices. Beautiful pieces that last season after season.' },
              { num: '03', title: 'New Styles Always', desc: 'Fresh drops every season — curated with real families in mind, from newborns to mamas.' },
              { num: '04', title: 'Quality You Feel', desc: 'Softer fabrics, elevated details, and care that shows in every single stitch.' },
            ].map((item, i) => (
              <motion.div key={item.num} variants={fadeUp} transition={{ ...springReveal, delay: i * 0.04 }} whileHover={{ y: -6 }} className="group border-t-2 border-pink/30 pt-6 transition-colors hover:border-pink sm:pt-7">
                <p className="font-serif text-4xl font-semibold text-pink/20 transition-colors group-hover:text-pink/40 sm:text-5xl">{item.num}</p>
                <h3 className="mt-3 text-[13px] font-black uppercase tracking-[0.1em] text-navy sm:mt-4">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-500 sm:mt-3">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-[#fdf8f5] py-14 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={springReveal}
            className="mb-8 text-center sm:mb-12"
          >
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-pink sm:mb-3">Reviews</p>
            <h2 className="font-serif text-3xl font-semibold text-navy sm:text-5xl">Loved by families everywhere</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-gray-500 sm:mt-3">Real notes from customers who live in these pieces.</p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          >
            {REVIEWS.map((review, i) => (
              <motion.div key={review.name} variants={fadeUp} transition={{ ...springReveal, delay: i * 0.04 }} whileHover={{ y: -6, scale: 1.015 }} className="rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl sm:p-7">
                <Stars count={review.rating}/>
                <p className="mb-5 mt-3 text-sm italic leading-7 text-gray-600 sm:mb-6 sm:mt-4">"{review.text}"</p>
                <div className="border-t border-black/8 pt-4">
                  <p className="text-[13px] font-bold text-navy">{review.name}</p>
                  <p className="text-[11px] text-gray-400">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INSTAGRAM PLACEHOLDER */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <div className="mb-8 text-center sm:mb-10">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-pink sm:mb-3">Follow along</p>
            <h2 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">Shop Our Instagram</h2>
            <p className="mt-2 text-sm text-gray-500">
              Follow us{' '}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#c084a0] font-medium">
                @caladaco
              </a>{' '}
              for daily style inspiration
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-[#fdf4f7] flex items-center justify-center overflow-hidden"
              >
                <img
                  src={[
                    '/assets/hero/porch-family.png',
                    '/assets/hero/flower-market.png',
                    '/assets/hero/boutique-rack.png',
                    '/assets/hero/porch-family.png',
                    '/assets/hero/flower-market.png',
                    '/assets/hero/boutique-rack.png',
                  ][i]}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-navy px-6 py-2.5 text-[12px] font-black uppercase tracking-[0.18em] text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="relative overflow-hidden border-y border-pink-light bg-[#fdf4f7] py-16 sm:py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={springReveal}
          className="relative mx-auto max-w-xl px-5 text-center sm:px-8"
        >
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-pink sm:mb-4">Join the family</p>
          <h2 className="font-serif text-3xl font-semibold text-navy sm:text-5xl">
            Get 20% off<br/>your first order
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500 sm:mt-4">
            Plus early access to new arrivals and exclusive members-only offers.
          </p>
          {emailSent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 sm:mt-10">
              <p className="text-lg font-semibold text-pink">You're in!</p>
              <p className="mt-2 text-sm text-slate-500">Check your inbox for your 20% off discount code.</p>
            </motion.div>
          ) : (
            <>
              <form className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row" onSubmit={handleEmailSignup}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm text-navy shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-pink focus:ring-4 focus:ring-pink/10 sm:px-6 sm:py-4"
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-pink disabled:opacity-60 sm:px-8 sm:py-4"
                >
                  {emailLoading ? 'Subscribing...' : 'Get 20% Off'}
                </button>
              </form>
              {emailError && <p className="mt-3 text-sm text-red-400">{emailError}</p>}
            </>
          )}
        </motion.div>
      </section>

    </div>
  );
}