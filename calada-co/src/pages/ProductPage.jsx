import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductByHandle, formatPrice } from '../services/shopify';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getFallbackImage } from '../data/visuals';

const COLOR_MAP = {
  black: '#111111', white: '#ffffff', red: '#cc0000', grey: '#9ca3af', gray: '#9ca3af',
  navy: '#1a2744', pink: '#ec4899', green: '#22c55e', yellow: '#eab308',
  purple: '#a855f7', orange: '#f97316', blue: '#3b82f6', brown: '#7c4b2a',
  'alpine green': '#3a5a40', alpine: '#3a5a40', basil: '#4a7c59', bay: '#4a7a6d',
  forest: '#2d5a27', 'forest green': '#2d5a27', emerald: '#047857', sage: '#b2c9a0',
  'irish green': '#169b62', 'island green': '#2ecc71', 'military green': '#4a5240',
  military: '#4a5240', military_green: '#4a5240', 'vintage military green': '#3d5229',
  'light green': '#86efac', 'green earth': '#6b8f5e', mint: '#98d8c8', 'mint green': '#98d8c8',
  'neo mint': '#a8e6cf', 'neon green': '#39ff14', 'safety green': '#00ff00',
  moss: '#8a9a5b', 'cypress green': '#3d6b4f', 'heather dark green': '#2d4a35',
  'heather forest': '#355e3b', 'chalky mint': '#b5e8d5', 'blue spruce': '#4a7b8c',
  'arctic blue': '#7ec8e3', 'blue jean': '#5b7fa6', chambray: '#6d8dad',
  'carolina blue': '#56a0d3', caribbean: '#00aacc', denim: '#1560bd',
  indigo: '#4f46e5', 'indigo blue': '#3949ab', 'dusty blue': '#7ba7bc',
  'ice blue': '#b0d4e3', 'light blue': '#93c5fd', 'flo blue': '#3a86ff',
  lagoon: '#5ba4b4', 'pacific blue': '#009dc4', pacific: '#009dc4',
  periwinkle: '#ccccff', royal: '#4169e1', 'royal caribbean': '#0077b6',
  'true royal': '#3b5998', 'heather royal': '#4a6fa5', 'heather navy': '#1e3a5f',
  'heather dark navy': '#162032', sky: '#87ceeb', oceanside: '#0077b6',
  'lavender blue': '#8080ff', 'heather deep teal': '#2a7f7f', cobalt: '#1e40af',
  crimson: '#dc143c', maroon: '#7f1d1d', burgundy: '#800020',
  'vintage burgundy': '#722f37', 'heather maroon': '#8b2635',
  'heather dark maroon': '#6b1a24', berry: '#8b1a4a', pomegranate: '#c0392b',
  raspberry: '#c0143c', 'true red': '#cc0000', heliconia: '#df3079',
  'hot pink': '#ff69b4', 'cyber pink': '#ff007f', 'safety pink': '#ff6eb4',
  'neon pink': '#fe019a', 'light pink': '#ffb6c1', 'blush pink': '#ffb6c1',
  blush: '#ffb6c1', blossom: '#ffc0cb', cameo: '#efbbcf', 'cameo pink': '#efbbcf',
  'heather heliconia': '#df3079', 'heather red': '#cc0000', scarlet: '#ff2400',
  paprika: '#8b1a1a', 'bright salmon': '#ff7f7f', salmon: '#fa8072',
  watermelon: '#fc6c85', melon: '#f3a683', wine: '#722f37', yam: '#c4622d',
  'cotton candy': '#ffbcd9', crunchberry: '#d44882',
  'deep purple': '#4a0e8f', orchid: '#da70d6', lavender: '#e6e6fa',
  'dark lavender': '#967bb6', violet: '#7f00ff', amethyst: '#9b59b6',
  'neon purple': '#bc13fe', mauve: '#e0b0c8', mauvelous: '#ef98aa',
  'heather mauve': '#c4a0b0', 'heather team purple': '#6b3fa0',
  grape: '#6f2da8', hydrangea: '#b8a9c9',
  mustard: '#d4a017', butter: '#f5d547', banana: '#ffe135',
  'bright orange': '#ff6700', 'burnt orange': '#cc5500', 'texas orange': '#bf5700',
  cantaloupe: '#ff8c69', mango: '#ff8c00', lemon: '#fff44f', peach: '#ffcba4',
  apricot: '#fbceb1', sunset: '#fd7c6e', autumn: '#d2691e',
  tan: '#d4b483', sand: '#c2b280', khaki: '#c3b091', bone: '#e3dac9',
  ivory: '#fffff0', cream: '#fef3c7', natural: '#f5f0e8', oatmeal: '#d4c5a9',
  latte: '#c4a882', mocha: '#967259', chocolate: '#7b3f00', espresso: '#4b2c20',
  'brown sugar': '#a0522d', java: '#5a3825', 'washed natural': '#ede8d0',
  'off white': '#f8f5f0', hemp: '#8c7b6b',
  charcoal: '#4b5563', graphite: '#6b7280', granite: '#808080',
  'sport grey': '#a8aaad', 'athletic heather': '#b0adb0', ash: '#b2bec3',
  smoke: '#9ca3af', asphalt: '#4a4a4a', oxford: '#4a4f5a', stone: '#8c8c8c',
  'heather grey': '#b0b0b0', 'deep heather': '#5a5a5a', titanium: '#878681',
  'vintage black': '#2a2a2a', storm: '#708090',
  saltwater: '#4a9ead', heather: '#b0a8b9', teal: '#14b8a6', turquoise: '#40e0d0',
  seafoam: '#9fe2bf', aqua: '#00bcd4', lime: '#84cc16', jade: '#00a86b',
  terracotta: '#e07150', copper: '#b87333', gold: '#ffd700', silver: '#c0c0c0',
};

const isColorOption = (name) => /colou?r/i.test(name);
const isDenomOption = (name) => /denomination/i.test(name);
const getColorHex = (val) => {
  const n = val.toLowerCase();
  for (const [k, hex] of Object.entries(COLOR_MAP)) { if (n.includes(k)) return hex; }
  return null;
};

const SPARKLE_COLORS  = ['#D4537E', '#c084a0', '#f0c8d8'];
const CONFETTI_COLORS = ['#D4537E', '#c084a0', '#1A2744', '#f0c8d8', '#ffffff'];

function drawStar(ctx, x, y, r, color, alpha) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const ang = (i * Math.PI) / 4, rad = i % 2 === 0 ? r : r * 0.35;
    i === 0
      ? ctx.moveTo(x + rad * Math.cos(ang), y + rad * Math.sin(ang))
      : ctx.lineTo(x + rad * Math.cos(ang), y + rad * Math.sin(ang));
  }
  ctx.closePath(); ctx.fill(); ctx.restore();
}

/* ── icons ── */
const HeartIcon = ({ filled }) => (
  <svg width="22" height="22" fill={filled ? '#c084a0' : 'none'} stroke={filled ? '#c084a0' : 'currentColor'} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const TruckIcon = () => (
  <svg width="28" height="28" fill="none" stroke="#c084a0" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" strokeLinejoin="round"/>
    <circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/>
  </svg>
);
const ReturnIcon = () => (
  <svg width="28" height="28" fill="none" stroke="#c084a0" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round"/>
    <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="28" height="28" fill="none" stroke="#c084a0" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round"/>
  </svg>
);
const GiftIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#c084a0" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#c084a0" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2" strokeLinecap="round"/>
  </svg>
);

export default function ProductPage() {
  const { handle } = useParams();
  const { addItem, loading: cartLoading } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  /* ── state ── */
  const [product, setProduct]           = useState(null);
  const [loading, setLoading]           = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedImg, setSelectedImg]   = useState(0);
  const [imageFailed, setImageFailed]   = useState({});
  const [added, setAdded]               = useState(false);
  const [openSection, setOpenSection]   = useState('description');
  const [quantity, setQuantity]         = useState(1);
  const [sizeError, setSizeError]       = useState(false);

  /* ── gift card ── */
  const isGiftCard = handle?.includes('gift-card');
  const [recipientName, setRecipientName] = useState('');
  const [giftMessage, setGiftMessage]     = useState('');
  const [voucherBouncing, setVoucherBouncing] = useState(false);
  const [denomPopping, setDenomPopping]   = useState(null);

  /* ── refs ── */
  const sparkleCanvasRef = useRef(null);
  const sparkleAnimRef   = useRef(null);
  const sparklesRef      = useRef([]);
  const confettiCanvasRef = useRef(null);
  const confettiAnimRef  = useRef(null);
  const hasInteracted    = useRef(false);

  /* ── option change ── */
  const handleOptionChange = (optionName, val) => {
    setSelectedOptions(o => ({ ...o, [optionName]: val }));
    if (isDenomOption(optionName)) {
      hasInteracted.current = true;
      setSelectedImg(images.length > 1 ? 1 : 0);
      setDenomPopping(val);
      setTimeout(() => setDenomPopping(null), 350);
    }
    if (isColorOption(optionName)) {
      const colorLower = val.toLowerCase();
      const matchIndex = images.findIndex(img =>
        img.altText?.toLowerCase().includes(colorLower) ||
        img.url?.toLowerCase().includes(colorLower)
      );
      setSelectedImg(matchIndex !== -1 ? matchIndex : 0);
    }
  };

  /* ── load product ── */
  useEffect(() => {
    setLoading(true);
    setImageFailed({});
    setSelectedImg(0);
    hasInteracted.current = false;
    getProductByHandle(handle)
      .then(item => setProduct(item || null))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [handle]);

  /* ── default options ── */
  useEffect(() => {
    if (!product?.options) return;
    const defaults = {};
    product.options.forEach(o => { defaults[o.name] = o.values[0]; });
    setSelectedOptions(defaults);
  }, [product]);

  const images = useMemo(() => {
    const imgs = product?.images?.edges?.map(e => e.node) || [];
    return imgs.length ? imgs : [{ url: getFallbackImage(handle), altText: handle }];
  }, [product, handle]);

  const variant = useMemo(() => {
    const variants = product?.variants?.edges?.map(e => e.node) || [];
    return variants.find(v =>
      v.selectedOptions?.every(o => selectedOptions[o.name] === o.value)
    ) || variants[0];
  }, [product, selectedOptions]);

  const price        = variant?.price || product?.priceRange?.minVariantPrice;
  const comparePrice = variant?.compareAtPrice || product?.compareAtPriceRange?.maxVariantPrice;
  const onSale       = comparePrice?.amount && price?.amount && parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const canAdd       = variant?.id && !variant.id.startsWith('dummy');
  const wishlisted   = isWishlisted(product?.id || handle);

  /* ── gift card computed ── */
  const validUntilDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }, []);

  const voucherValue = useMemo(() => {
    const entry = Object.entries(selectedOptions).find(([k]) => /denomination/i.test(k));
    if (entry) return entry[1];
    if (price?.amount) return `$${parseFloat(price.amount).toFixed(2)}`;
    return '';
  }, [selectedOptions, price]);

  /* ── voucher bounce ── */
  useEffect(() => {
    if (!voucherValue || !isGiftCard) return;
    setVoucherBouncing(true);
    const t = setTimeout(() => setVoucherBouncing(false), 420);
    return () => clearTimeout(t);
  }, [voucherValue]);

  /* ── auto-flip to personalize card when name typed ── */
  useEffect(() => {
    if (!isGiftCard || images.length < 2) return;
    if (recipientName.trim()) setSelectedImg(1);
  }, [recipientName, isGiftCard, images.length]);

  /* ── sparkle animation ── */
  useEffect(() => {
    if (!isGiftCard) return;
    const canvas = sparkleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0) {
        canvas.width  = rect.width;
        canvas.height = rect.height;
        sparklesRef.current = Array.from({ length: 22 }, () => ({
          x:     Math.random() * canvas.width,
          y:     Math.random() * canvas.height,
          r:     Math.random() * 2.2 + 0.6,
          alpha: Math.random(),
          da:    (Math.random() * 0.025 + 0.008) * (Math.random() < 0.5 ? 1 : -1),
          vy:    Math.random() * 0.25 + 0.08,
          color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        }));
      }
    };
    const initTimer = setTimeout(resize, 80);

    const animate = () => {
      if (canvas.width > 0 && canvas.height > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparklesRef.current.forEach(s => {
          s.alpha += s.da;
          if (s.alpha > 1 || s.alpha < 0) s.da *= -1;
          s.y -= s.vy;
          if (s.y < -4) { s.y = canvas.height + 4; s.x = Math.random() * canvas.width; }
          drawStar(ctx, s.x, s.y, s.r, s.color, s.alpha);
        });
      }
      sparkleAnimRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearTimeout(initTimer);
      if (sparkleAnimRef.current) cancelAnimationFrame(sparkleAnimRef.current);
    };
  }, [isGiftCard]);

  /* ── confetti ── */
  const triggerConfetti = useCallback(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    if (confettiAnimRef.current) cancelAnimationFrame(confettiAnimRef.current);

    const pieces = Array.from({ length: 130 }, () => ({
      x: Math.random() * canvas.width, y: canvas.height + 10,
      w: Math.random() * 9 + 4, h: Math.random() * 5 + 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rot: Math.random() * Math.PI * 2, rv: (Math.random() - 0.5) * 0.15,
      vx: (Math.random() - 0.5) * 7, vy: -(Math.random() * 10 + 7), g: 0.32,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.rv;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (frame < 120 || alive) confettiAnimRef.current = requestAnimationFrame(draw);
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = 'none'; }
    };
    draw();
  }, []);

  /* ── add to cart ── */
  const handleAddToCart = async () => {
    const sizeOption = product?.options?.find(o => /size/i.test(o.name));
    if (sizeOption && !selectedOptions[sizeOption.name]) {
      setSizeError(true); setTimeout(() => setSizeError(false), 3000); return;
    }
    if (!variant?.id || cartLoading) return;

    const giftAttrs = isGiftCard ? [
      { key: 'Voucher Value', value: voucherValue },
      ...(recipientName.trim() ? [{ key: 'Recipient Name', value: recipientName.trim() }] : []),
      ...(giftMessage.trim()   ? [{ key: 'Gift Message',   value: giftMessage.trim()   }] : []),
      { key: 'Valid Until', value: validUntilDate },
    ] : undefined;

    try {
      for (let i = 0; i < quantity; i++) await addItem(variant.id, giftAttrs);
      if (isGiftCard) triggerConfetti();
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch {}
  };

  const prevImg = () => setSelectedImg(i => (i - 1 + images.length) % images.length);
  const nextImg = () => setSelectedImg(i => (i + 1) % images.length);

  /* ── which card is the personalize side ── */
  const backIdx      = images.length > 1 ? 1 : 0;
  const isShowingBack = selectedImg === backIdx;

  /* ── loading skeleton ── */
  if (loading) return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex gap-3">
          <div className="hidden w-20 flex-col gap-2 lg:flex">
            {[...Array(4)].map((_, i) => <div key={i} className="aspect-square animate-pulse rounded bg-gray-100"/>)}
          </div>
          <div className="aspect-[3/4] flex-1 animate-pulse rounded-lg bg-gray-100"/>
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-7 w-3/4 animate-pulse rounded bg-gray-100"/>
          <div className="h-8 w-1/4 animate-pulse rounded bg-gray-100"/>
          <div className="h-4 w-full animate-pulse rounded bg-gray-100"/>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <p className="text-gray-500">Product not found.</p>
      <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-[#c084a0] underline">Back to Shop</Link>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-8 lg:py-12"
    >
      <style>{`
        @keyframes voucherBounce { 0%,100%{transform:scale(1)} 40%{transform:scale(1.32)} 70%{transform:scale(0.95)} }
        @keyframes denomPop      { 0%,100%{transform:scale(1)} 50%{transform:scale(1.11)} }
        .voucher-bounce { animation: voucherBounce 0.4s ease; }
        .denom-pop      { animation: denomPop 0.32s ease; }
      `}</style>

      {/* Confetti canvas */}
      <canvas ref={confettiCanvasRef} style={{ position:'fixed', inset:0, zIndex:9999, pointerEvents:'none', display:'none' }}/>

      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c084a0]">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-[#c084a0]">All Clothing</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.82fr)] lg:gap-14">

        {/* ══ LEFT: Image Panel ══ */}
        <div className="flex gap-3">
          {isGiftCard ? (

            /* ── Gift card panel ── */
            <div className="flex flex-1 flex-col gap-3">

              {/* Main preview */}
              <div className="relative overflow-hidden rounded-lg bg-white" style={{ aspectRatio:'16/10' }}>

                {/* Sparkle canvas */}
                <canvas ref={sparkleCanvasRef} className="absolute inset-0 z-10 h-full w-full pointer-events-none"/>

                {/* Card image — starts on front (0), flips to personalize (1) on interaction */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImg}
                    src={imageFailed[selectedImg] ? getFallbackImage(handle) : images[selectedImg]?.url}
                    alt={images[selectedImg]?.altText || product.title}
                    onError={() => setImageFailed(f => ({ ...f, [selectedImg]: true }))}
                    initial={{ opacity:0, x:18 }}
                    animate={{ opacity:1, x:0  }}
                    exit={{    opacity:0, x:-18 }}
                    transition={{ duration:0.3, ease:'easeOut' }}
                    className="h-full w-full object-contain"
                  />
                </AnimatePresence>

                {/* ── Live overlay — VALUES ONLY (no labels).
                    The card image already has "Voucher Value :", "Recipient Name :", "Valid Until :"
                    printed on it. These divs fill in the blank lines that follow each label.
                    ⚠ Tune top/left % in DevTools until each value sits on its blank line. ── */}
               {isShowingBack && (
  <div className="absolute inset-0 pointer-events-none">

    {/* Voucher value — pushed right past the "Voucher Value :" label, up onto the line */}
    <div style={{ position:'absolute', left:'28%', top:'36%', width:'30%' }}>
      <p style={{
        fontSize:'13px', fontWeight:600, margin:0, lineHeight:1,
        color: voucherValue ? '#1A2744' : '#bbb',
        transition:'color 0.35s',
      }}>
        {voucherValue || ''}
      </p>
    </div>

    {/* Recipient name — pushed right past the "Recipient Name :" label, up onto the line */}
    <div style={{ position:'absolute', left:'28%', top:'46%', width:'30%' }}>
      <p style={{
        fontSize:'12px', margin:0, lineHeight:1,
        color: recipientName ? '#1A2744' : '#aaa',
        fontStyle: recipientName ? 'normal' : 'italic',
        backgroundColor: recipientName ? 'rgba(255,255,255,0.65)' : 'transparent',
        borderRadius:'2px',
        padding: recipientName ? '1px 3px' : '0',
        display:'inline-block',
        maxWidth:'100%',
        wordBreak:'break-word',
        transition:'color 0.2s',
      }}>
        {recipientName || ''}
      </p>
    </div>

    {/* Valid until — stays roughly where it was */}
    <div style={{ position:'absolute', left:'20%', top:'60%', width:'36%' }}>
      <p style={{ fontSize:'11px', color:'#555', margin:0, lineHeight:1 }}>
        {validUntilDate}
      </p>
    </div>

  </div>
)}

                {/* Hint on front card */}
                {!isShowingBack && (
                  <motion.div
                    initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#c084a0] whitespace-nowrap"
                  >
                    Select a denomination to personalize →
                  </motion.div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => setSelectedImg(i)}
                        className={`flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                          selectedImg === i ? 'border-[#c084a0]' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={imageFailed[i] ? getFallbackImage(handle) : img.url}
                          alt={img.altText || `View ${i + 1}`}
                          onError={() => setImageFailed(f => ({ ...f, [i]: true }))}
                          className="h-14 w-20 object-contain bg-white"
                        />
                      </button>
                      <span className="text-[9px] uppercase tracking-wider text-gray-400">
                        {i === 0 ? 'Front' : 'Personalize'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          ) : (

            /* ── Standard product gallery ── */
            <>
              {images.length > 1 && (
                <div className="hidden w-[72px] flex-shrink-0 flex-col gap-2 lg:flex">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImg(i)}
                      className={`overflow-hidden rounded-md border-2 transition-all ${selectedImg === i ? 'border-[#c084a0]' : 'border-transparent hover:border-gray-300'}`}>
                      <img src={imageFailed[i] ? getFallbackImage(handle) : img.url}
                        alt={img.altText || `View ${i + 1}`}
                        onError={() => setImageFailed(f => ({ ...f, [i]: true }))}
                        className="aspect-square w-full object-cover"/>
                    </button>
                  ))}
                </div>
              )}

              <div className="relative flex-1 overflow-hidden rounded-lg bg-gray-50">
                <AnimatePresence mode="wait">
                  <motion.img key={selectedImg}
                    src={imageFailed[selectedImg] ? getFallbackImage(handle) : images[selectedImg]?.url}
                    alt={images[selectedImg]?.altText || product.title}
                    onError={() => setImageFailed(f => ({ ...f, [selectedImg]: true }))}
                    initial={{ opacity:0, scale:1.02 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                    transition={{ duration:0.25 }}
                    className="aspect-[3/4] w-full object-cover"/>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white" aria-label="Previous"><ChevronLeft/></button>
                    <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white" aria-label="Next"><ChevronRight/></button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 lg:hidden">
                      {images.map((_, i) => (
                        <button key={i} onClick={() => setSelectedImg(i)}
                          className={`h-1.5 rounded-full transition-all ${selectedImg === i ? 'w-5 bg-[#c084a0]' : 'w-1.5 bg-white/70'}`}/>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
                      {images.map((img, i) => (
                        <button key={i} onClick={() => setSelectedImg(i)}
                          className={`flex-shrink-0 overflow-hidden rounded border-2 transition-all ${selectedImg === i ? 'border-[#c084a0]' : 'border-transparent'}`}>
                          <img src={imageFailed[i] ? getFallbackImage(handle) : img.url} alt={`View ${i + 1}`}
                            onError={() => setImageFailed(f => ({ ...f, [i]: true }))}
                            className="h-14 w-14 object-cover"/>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* ══ RIGHT: Product Info ══ */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">

          <h1 className="text-2xl font-semibold leading-snug text-gray-900 lg:text-3xl">
            {product.title}
          </h1>

          <div className="flex items-baseline gap-3">
            {price && (
              <span className={`text-2xl font-bold ${onSale ? 'text-red-500' : 'text-gray-900'}`}>
                {formatPrice(price.amount, price.currencyCode)}
              </span>
            )}
            {onSale && comparePrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
              </span>
            )}
            {onSale && <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-600">SALE</span>}
          </div>

          <div className="rounded-lg border border-pink-light bg-[#fff8fb] px-4 py-3 text-sm leading-6 text-[#6b4352]">
            Made to order with secure checkout, easy returns, and shipping options shown before payment.
          </div>

          <hr className="border-gray-100"/>

          {/* Options */}
          {product.options?.filter(o => o.values.length > 1).map(option => (
            <div key={option.name}>
              <p className="mb-2.5 text-sm font-semibold uppercase tracking-widest text-gray-700">
                {option.name}
                {selectedOptions[option.name] && (
                  <span className="ml-2 font-normal normal-case text-gray-400">— {selectedOptions[option.name]}</span>
                )}
              </p>

              {isColorOption(option.name) ? (
                <div className="flex flex-wrap gap-2">
                  {option.values.map(val => {
                    const hex = getColorHex(val);
                    const active = selectedOptions[option.name] === val;
                    return (
                      <button key={val} title={val} onClick={() => handleOptionChange(option.name, val)}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${active ? 'border-[#c084a0] scale-110 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                        style={hex ? { backgroundColor:hex, boxShadow: active ? `0 0 0 2px white, 0 0 0 4px ${hex}` : undefined } : undefined}>
                        {!hex && <span className="text-[9px] leading-none">{val.slice(0,2)}</span>}
                      </button>
                    );
                  })}
                </div>

              ) : isGiftCard && isDenomOption(option.name) ? (
                /* Gift card denomination tiles */
                <div className="grid grid-cols-4 gap-2">
                  {option.values.map(val => {
                    const active = selectedOptions[option.name] === val;
                    return (
                      <button key={val} onClick={() => handleOptionChange(option.name, val)}
                        className={`overflow-hidden rounded-lg border-2 transition-all ${active ? 'border-[#D4537E]' : 'border-gray-200 hover:border-[#c084a0]'} ${denomPopping === val ? 'denom-pop' : ''}`}>
                        <div className="relative h-10 overflow-hidden"
                          style={{ backgroundImage: images[0]?.url ? `url(${images[0].url})` : 'none', backgroundColor:'#fff5f8', backgroundSize:'cover', backgroundPosition:'left center' }}>
                          <div className="absolute inset-0" style={{ backgroundColor: active ? 'rgba(212,83,126,0.15)' : 'rgba(255,255,255,0.25)' }}/>
                        </div>
                        <div className={`border-t border-gray-100 py-1.5 text-center text-sm font-semibold ${active ? 'text-[#c084a0]' : 'text-gray-700'}`}>
                          {val}
                        </div>
                      </button>
                    );
                  })}
                </div>

              ) : (
                /* Standard buttons */
                <div className="flex flex-wrap gap-2">
                  {option.values.map(val => {
                    const active = selectedOptions[option.name] === val;
                    return (
                      <button key={val} onClick={() => handleOptionChange(option.name, val)}
                        className={`min-w-[48px] rounded-md border px-3 py-2 text-sm font-medium transition-all ${
                          active ? 'border-[#c084a0] bg-[#c084a0] text-white' : 'border-gray-200 text-gray-700 hover:border-[#c084a0] hover:text-[#c084a0]'
                        }`}>
                        {val}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Gift card personalization panel */}
          {isGiftCard && (
            <div className="space-y-4 rounded-xl border border-pink-100 bg-[#fff8fb] p-5">
              <div className="flex items-center gap-2">
                <GiftIcon/>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-700">Personalize Your Gift Card</p>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">Voucher Value</p>
                <div className="flex items-center gap-2.5 rounded-md border border-gray-200 bg-white px-3 py-2.5">
                  <span
                    className={voucherBouncing ? 'voucher-bounce' : ''}
                    style={{ fontSize:'18px', fontWeight:700, color:'#c084a0', display:'inline-block', minWidth:'56px' }}
                  >
                    {voucherValue || '—'}
                  </span>
                  <span className="text-xs text-gray-400">· auto-filled from denomination above</span>
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">Recipient Name</p>
                <input type="text" value={recipientName} onChange={e => setRecipientName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:border-[#c084a0] focus:outline-none focus:ring-2 focus:ring-[#c084a0]/20"/>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Gift Message <span className="font-normal normal-case text-gray-400">(optional)</span>
                </p>
                <textarea value={giftMessage} onChange={e => setGiftMessage(e.target.value)}
                  placeholder="Write a heartfelt message for the recipient..." rows={3}
                  className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:border-[#c084a0] focus:outline-none focus:ring-2 focus:ring-[#c084a0]/20"/>
              </div>

              <div className="flex items-center gap-2 rounded-md bg-pink-50 px-3 py-2.5">
                <ClockIcon/>
                <span className="text-sm text-gray-600">
                  Valid Until: <strong className="text-gray-800">{validUntilDate}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-700">Quantity</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-lg font-bold text-gray-700 hover:border-[#c084a0] hover:text-[#c084a0] transition-colors">-</button>
              <span className="w-8 text-center text-base font-semibold text-gray-900">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-lg font-bold text-gray-700 hover:border-[#c084a0] hover:text-[#c084a0] transition-colors">+</button>
            </div>
          </div>

          {sizeError && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600 font-medium">
              Please select a size before adding to cart.
            </div>
          )}

          {/* Add to cart */}
          <div className="flex gap-3">
            <button onClick={handleAddToCart} disabled={!canAdd || cartLoading}
              className={`flex-1 rounded-lg py-4 text-sm font-bold uppercase tracking-wider shadow-sm transition-all ${
                added        ? 'bg-green-500 text-white'
                : canAdd     ? 'bg-gray-900 text-white hover:bg-[#c084a0] hover:shadow-md active:scale-[0.99]'
                : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}>
              {added ? '✓ Added to Bag!' : cartLoading ? 'Adding...' : canAdd
                ? ('Add to Cart'
                  + (selectedOptions['Color'] ? ' — ' + selectedOptions['Color'] : '')
                  + (selectedOptions['Size']  ? ' / '  + selectedOptions['Size']  : ''))
                : 'Select options'}
            </button>

            <button onClick={() => toggle(product.id || handle)}
              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-all active:scale-95 ${
                wishlisted ? 'border-[#c084a0] bg-pink-50' : 'border-gray-200 hover:border-[#c084a0]'
              }`}
              aria-label="Add to wishlist">
              <HeartIcon filled={wishlisted}/>
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-gray-100 p-4">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <TruckIcon/><p className="text-xs font-semibold text-gray-700">Free Shipping</p><p className="text-[11px] text-gray-400">Orders $79+</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ReturnIcon/><p className="text-xs font-semibold text-gray-700">30-Day Returns</p><p className="text-[11px] text-gray-400">Hassle-free</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldIcon/><p className="text-xs font-semibold text-gray-700">Best Price</p><p className="text-[11px] text-gray-400">Guaranteed</p>
            </div>
          </div>

          {/* Accordions */}
          {[
            { key:'description', label:'Description',     content: product.description || product.descriptionHtml },
            { key:'materials',   label:'Material & Care', content: 'Hand wash cold or machine wash gentle. Lay flat to dry. Do not bleach.' },
            { key:'sizing',      label:'Size & Fit',      content: 'Model is wearing a size S. Fits true to size. See our size guide for full measurements.' },
          ].map(({ key, label, content }) => (
            <div key={key} className="border-t border-gray-100">
              <button onClick={() => setOpenSection(openSection === key ? null : key)}
                className="flex w-full items-center justify-between py-4 text-sm font-semibold uppercase tracking-widest text-gray-700">
                {label}
                <span className={`transition-transform duration-200 ${openSection === key ? 'rotate-180' : ''}`}>
                  <ChevronDown/>
                </span>
              </button>
              <AnimatePresence>
                {openSection === key && (
                  <motion.div
                    initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }}
                    className="overflow-hidden">
                    <div className="pb-4 text-sm leading-relaxed text-gray-500"
                      dangerouslySetInnerHTML={content ? { __html: content } : undefined}/>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
}