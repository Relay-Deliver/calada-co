export const HERO_SLIDES = [
  {
    id: 'spring-refresh',
    eyebrow: 'Spring Refresh',
    title: 'New Styles Are Here',
    subtitle: 'Shine with fresh pieces for mothers, families, and little ones.',
    cta: 'Shop Spring / Summer',
    to: '/shop',
    image: '/assets/hero/porch-family.png',
    align: 'center',
  },
  {
    id: 'mama-mini',
    eyebrow: 'Mama + Mini',
    title: 'Soft Sets, Sweet Days',
    subtitle: 'Coordinated boutique outfits made for everyday family memories.',
    cta: 'Shop Family Sets',
    to: '/collections/family-sets',
    image: '/assets/hero/flower-market.png',
    align: 'left',
  },
  {
    id: 'family-ready',
    eyebrow: 'Family Favorites',
    title: 'Made To Match',
    subtitle: 'Easy, polished styles for photos, outings, gifting, and play.',
    cta: 'Explore Best Sellers',
    to: '/collections/best-sellers',
    image: '/assets/hero/boutique-rack.png',
    align: 'right',
  },
];

export const CATEGORY_TILES = [
  {
    label: 'Browse All',
    desc: 'Start with every live Shopify product',
    to: '/shop',
    image: '/assets/hero/flower-market.png',
  },
  {
    label: 'New Arrivals',
    desc: 'Fresh pieces ready to add to your bag',
    to: '/collections/new-arrivals',
    image: '/assets/hero/porch-family.png',
  },
  {
    label: 'Family Sets',
    desc: 'Choose a set, pick options, checkout',
    to: '/collections/family-sets',
    image: '/assets/hero/boutique-rack.png',
  },
  {
    label: 'Gift Ready',
    desc: 'Quick picks for simple ordering',
    to: '/shop?q=gift',
    image: '/assets/hero/flower-market.png',
  },
];

export const NAV_MENUS = {
  bundles: {
    label: 'Bundles',
    to: '/collections/family-sets',
    cards: [
      {
        title: 'Mama + Mini Bundle',
        caption: 'Save up to 30%',
        to: '/collections/family-sets',
        image: '/assets/hero/flower-market.png',
      },
      {
        title: 'Family Weekend Set',
        caption: 'Soft matching favorites',
        to: '/collections/family-sets',
        image: '/assets/hero/porch-family.png',
      },
    ],
  },
  shop: {
    label: 'Shop',
    to: '/shop',
    cards: [
      {
        title: 'Shop All',
        caption: 'Fresh arrivals and fan favorites',
        to: '/shop',
        image: '/assets/hero/boutique-rack.png',
      },
      {
        title: 'Gift Ready',
        caption: 'Thoughtful pieces for every family',
        to: '/collections/gifts',
        image: '/assets/hero/flower-market.png',
      },
    ],
  },
  collections: {
    label: 'Collections',
    to: '/collections/women',
    cards: [
      {
        title: 'Women',
        caption: 'Elevated everyday apparel',
        to: '/collections/women',
        image: '/assets/hero/flower-market.png',
      },
      {
        title: 'Children',
        caption: 'Playful spring essentials',
        to: '/collections/children',
        image: '/assets/hero/porch-family.png',
      },
    ],
  },
  arrivals: {
    label: 'New Arrivals',
    to: '/collections/new-arrivals',
    cards: [
      {
        title: 'Spring Refresh',
        caption: 'New styles just landed',
        to: '/collections/new-arrivals',
        image: '/assets/hero/porch-family.png',
      },
      {
        title: 'Soft Florals',
        caption: 'Lightweight pieces for warm days',
        to: '/collections/women',
        image: '/assets/hero/boutique-rack.png',
      },
    ],
  },
  bestSellers: {
    label: 'Best Sellers',
    to: '/collections/best-sellers',
    cards: [
      {
        title: 'Most Loved',
        caption: 'Customer favorites this week',
        to: '/collections/best-sellers',
        image: '/assets/hero/boutique-rack.png',
      },
      {
        title: 'Little Favorites',
        caption: 'Top picks for children',
        to: '/collections/children',
        image: '/assets/hero/porch-family.png',
      },
    ],
  },
  more: {
    label: 'More',
    to: '/about',
    cards: [
      {
        title: 'Our Story',
        caption: 'Meet CalAda & Co',
        to: '/about',
        image: '/assets/hero/porch-family.png',
      },
      {
        title: 'Contact Us',
        caption: 'Questions, sizing, and support',
        to: '/contact',
        image: '/assets/hero/flower-market.png',
      },
    ],
  },
};

export const FALLBACK_IMAGES = [
  '/assets/hero/porch-family.png',
  '/assets/hero/flower-market.png',
  '/assets/hero/boutique-rack.png',
];

export function getFallbackImage(seed = '') {
  const value = String(seed)
    .split('')
    .reduce((total, char) => total + char.charCodeAt(0), 0);

  return FALLBACK_IMAGES[value % FALLBACK_IMAGES.length];
}
