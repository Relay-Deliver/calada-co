import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getProducts } from '../services/shopify';
import ProductCard from '../components/product/ProductCard';
import { DUMMY_PRODUCTS } from '../data/dummyProducts';
import { CATEGORY_TILES, HERO_SLIDES } from '../data/visuals';

const REVIEWS = [
  {
    name: 'Sarah M.',
    location: 'Austin, TX',
    text: 'Absolutely love the quality. My daughter wore hers all summer long and it still looks brand new.',
    rating: 5,
  },
  {
    name: 'Jamie L.',
    location: 'Nashville, TN',
    text: 'Fast shipping and the colors are even prettier in person. I will definitely be ordering again.',
    rating: 5,
  },
  {
    name: 'Erin K.',
    location: 'Denver, CO',
    text: 'The matching family set was perfect for our photoshoot. We got so many compliments.',
    rating: 5,
  },
  {
    name: 'Dana P.',
    location: 'Seattle, WA',
    text: 'Such a sweet boutique. Every piece feels intentional and special. Love this brand.',
    rating: 5,
  },
];

const PERKS = [
  { title: 'Made to Order', desc: 'Every piece crafted just for you' },
  { title: 'Fast Shipping', desc: 'Ready in 3-5 business days' },
  { title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { title: 'Real Support', desc: 'From real people who care' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionIntro({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mx-auto mb-10 max-w-xl text-center"
    >
      {eyebrow && (
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-pink">{eyebrow}</p>
      )}
      <h2 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-6 text-gray-500">{subtitle}</p>}
    </motion.div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    getProducts({ first: 8 })
      .then((data) => setProducts(data.edges.map((e) => e.node)))
      .catch(() => setProducts(DUMMY_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 6200);

    return () => window.clearInterval(timer);
  }, []);

  const displayProducts = useMemo(
    () => (products.length > 0 ? products : DUMMY_PRODUCTS),
    [products]
  );
  const slide = HERO_SLIDES[activeSlide];

  const goToSlide = (direction) => {
    setActiveSlide((current) => {
      if (direction === 'prev') return current === 0 ? HERO_SLIDES.length - 1 : current - 1;
      return (current + 1) % HERO_SLIDES.length;
    });
  };

  return (
    <div className="overflow-x-hidden bg-white">
      <section className="relative min-h-[calc(100vh-132px)] overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.id}
            src={slide.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-white/18" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/35" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-132px)] max-w-screen-2xl items-center justify-center px-5 py-16 text-center sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="max-w-5xl"
            >
              <p className="mb-5 text-[11px] font-black uppercase tracking-[0.32em] text-black/80">
                {slide.eyebrow}
              </p>
              <h1 className="text-balance font-serif text-[3.25rem] font-black uppercase leading-[0.9] tracking-normal text-black sm:text-[5.8rem] lg:text-[7.5rem]">
                {slide.title.split(' ').slice(0, -1).join(' ')}
                <span className="relative ml-3 inline-block text-white">
                  {slide.title.split(' ').slice(-1)}
                  <svg
                    className="pointer-events-none absolute -inset-x-4 -inset-y-3"
                    viewBox="0 0 220 88"
                    fill="none"
                    aria-hidden="true"
                  >
                    <ellipse
                      cx="110"
                      cy="44"
                      rx="100"
                      ry="34"
                      stroke="black"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(-7 110 44)"
                    />
                  </svg>
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-black/80 sm:text-2xl">
                {slide.subtitle}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to={slide.to}
                  className="border-2 border-black bg-white/90 px-10 py-4 text-[13px] font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-black hover:text-white"
                >
                  {slide.cta}
                </Link>
                <Link
                  to="/about"
                  className="border-b-2 border-black pb-1 text-[12px] font-black uppercase tracking-[0.18em] text-black transition-colors hover:border-pink hover:text-pink"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/85 px-4 py-2 shadow-sm backdrop-blur">
          <button
            type="button"
            onClick={() => goToSlide('prev')}
            className="grid h-8 w-8 place-items-center rounded-full text-black transition-colors hover:bg-black hover:text-white"
            aria-label="Previous hero slide"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeSlide ? 'w-8 bg-black' : 'w-2.5 bg-black/25 hover:bg-black/45'
                }`}
                aria-label={`Show ${item.eyebrow} hero slide`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goToSlide('next')}
            className="grid h-8 w-8 place-items-center rounded-full text-black transition-colors hover:bg-black hover:text-white"
            aria-label="Next hero slide"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white py-8">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-5 px-5 sm:px-8 lg:grid-cols-4">
          {PERKS.map((perk, index) => (
            <motion.div
              key={perk.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="border-l border-black/10 pl-5 first:border-l-0 first:pl-0"
            >
              <p className="text-[13px] font-black uppercase tracking-[0.1em] text-navy">{perk.title}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <SectionIntro
            eyebrow="Start your order"
            title="Shop, add to bag, checkout"
            subtitle="Browse live Shopify products, choose your favorite, and continue to secure checkout from your bag."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {CATEGORY_TILES.map((cat, index) => (
              <motion.div
                key={cat.to}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Link
                  to={cat.to}
                  className="group relative block min-h-[320px] overflow-hidden rounded-[8px] bg-gray-100"
                >
                  <img src={cat.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">{cat.desc}</p>
                    <h3 className="mt-2 text-3xl font-black uppercase tracking-[0.03em]">{cat.label}</h3>
                    <span className="mt-4 inline-flex border-b border-white pb-1 text-[12px] font-bold uppercase tracking-[0.16em]">
                      Shop now
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-pink">Customer picks</p>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">Fan Favorites</h2>
              <p className="mt-2 text-sm text-gray-500">Our most-loved pieces right now</p>
            </div>
            <Link
              to="/shop"
              className="hidden border-b-2 border-navy pb-1 text-[12px] font-black uppercase tracking-[0.16em] text-navy transition-colors hover:border-pink hover:text-pink sm:inline-flex"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-[8px] bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ staggerChildren: 0.08 }}
              className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
            >
              {displayProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="bg-navy py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-pink-mid">Our Story</p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-5xl">
              Born from a mother's love for her family.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/55">
              CalAda & Co started with a simple idea: every family deserves beautiful, thoughtfully made pieces they will reach for again and again.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex border-b border-pink-mid pb-1 text-[12px] font-bold uppercase tracking-[0.16em] text-pink-mid transition-colors hover:border-white hover:text-white"
            >
              Read our full story
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { stat: '2,000+', label: 'Happy families' },
              { stat: '100%', label: 'Made to order' },
              { stat: '5-star', label: 'Average review' },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif text-3xl font-semibold text-white sm:text-4xl">{item.stat}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/35">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <SectionIntro
            eyebrow="Reviews"
            title="Loved by families everywhere"
            subtitle="Real notes from customers who live in these pieces."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="rounded-[8px] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex gap-0.5">
                  {[...Array(review.rating)].map((_, star) => (
                    <svg key={star} width="14" height="14" fill="#D4537E" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-5 text-sm italic leading-7 text-gray-600">"{review.text}"</p>
                <p className="text-sm font-bold text-navy">{review.name}</p>
                <p className="text-xs text-gray-400">{review.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-xl px-5 text-center sm:px-8"
        >
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-pink">Join the family</p>
          <h2 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">Get 20% off your first order</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
            Plus early access to new arrivals and exclusive members-only offers.
          </p>

          {emailSent ? (
            <p className="mt-8 text-base font-semibold text-pink">
              You are in. Check your inbox for your discount code.
            </p>
          ) : (
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setEmailSent(true);
                setEmail('');
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-w-0 flex-1 rounded-full border border-gray-200 px-5 py-3.5 text-sm text-navy outline-none transition-colors placeholder:text-gray-400 focus:border-pink"
              />
              <button
                type="submit"
                className="rounded-full bg-navy px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy-mid"
              >
                Sign Me Up
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}
