export const HERO_SLIDES = [
  {
    id: 'spring-refresh',
    eyebrow: 'Spring Refresh',
    title: 'New Styles Are Here',
    subtitle: 'Shine with fresh pieces for mothers, families, and little ones.',
    cta: 'Shop Spring / Summer',
    to: '/shop',
    image: '/assets/family.png',
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
    desc: 'Start with every live product',
    to: '/shop',
    image: '/assets/hero/flower-market.png',
  },
  {
    label: 'New Arrivals',
    desc: 'Fresh pieces ready to add to your bag',
    to: '/collections/new-arrivals',
    image: '/assets/family.png',
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
    label: 'Bundles (Up to 30% Off)',
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
        image: '/assets/family.png',
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
    to: '/collections',
    groups: [
      {
        heading: 'Sports',
        links: [
          { label: 'Baseball / Softball', to: '/collections/baseball-softball' },
          { label: 'Football', to: '/collections/football' },
          { label: 'Basketball', to: '/collections/basketball' },
          { label: 'Cheer', to: '/collections/cheer' },
          { label: 'Tennis / Pickleball', to: '/collections/tennis-pickleball' },
          { label: 'Soccer', to: '/collections/soccer' },
          { label: 'Gymnastics', to: '/collections/gymnastics' },
          { label: '4H', to: '/collections/4h' },
          { label: 'Golf', to: '/collections/golf' },
        ],
      },
      {
        heading: 'Seasons',
        links: [
          { label: 'Summer', to: '/collections/summer' },
          { label: 'Fall / Thanksgiving / Halloween', to: '/collections/fall' },
          { label: 'Christmas / Winter', to: '/collections/christmas-winter' },
          { label: 'Spring / Easter', to: '/collections/spring-easter' },
          { label: 'Valentine\'s Day', to: '/collections/valentines-day' },
          { label: 'St. Patrick\'s Day', to: '/collections/st-pats-day' },
          { label: 'Red White Blue', to: '/collections/red-white-blue' },
        ],
      },
      {
        heading: 'Lifestyle',
        links: [
          { label: 'Moms', to: '/collections/moms' },
          { label: 'Coffee Lovers', to: '/collections/coffee-lovers' },
          { label: 'Michigan Made', to: '/collections/michigan-made' },
          { label: 'Reading', to: '/collections/reading' },
          { label: 'Teacher / School', to: '/collections/teacher-school' },
          { label: 'Kids', to: '/collections/kids' },
          { label: 'Homestead / Farm', to: '/collections/homestead-farm' },
          { label: 'Pet Lover', to: '/collections/pet-lover' },
          { label: 'Mens', to: '/collections/mens' },
        ],
      },
    ],
    cards: [
      {
        title: 'Sports',
        caption: 'Rep your team in style',
        to: '/collections/baseball-softball',
        image: '/assets/hero/porch-family.png',
      },
      {
        title: 'Seasons',
        caption: 'Dressed for every holiday',
        to: '/collections/summer',
        image: '/assets/hero/flower-market.png',
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
        to: '/collections/summer',
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
        to: '/collections/kids',
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

export const navMenus = [
  {
    label: 'New Arrivals',
    href: '/collections/new-arrivals',
  },
  {
    label: 'Sports',
    columns: [
      {
        heading: 'Sports',
        links: [
          { label: 'Baseball / Softball', href: '/collections/baseball-softball' },
          { label: 'Football', href: '/collections/football' },
          { label: 'Basketball', href: '/collections/basketball' },
          { label: 'Cheer', href: '/collections/cheer' },
          { label: 'Tennis / Pickleball', href: '/collections/tennis-pickleball' },
          { label: 'Soccer', href: '/collections/soccer' },
          { label: 'Gymnastics', href: '/collections/gymnastics' },
          { label: '4H', href: '/collections/4h' },
          { label: 'Golf', href: '/collections/golf' },
        ],
      },
    ],
  },
  {
    label: 'Seasons',
    columns: [
      {
        heading: 'Seasons',
        links: [
          { label: 'Summer', href: '/collections/summer' },
          { label: 'Fall / Thanksgiving / Halloween', href: '/collections/fall' },
          { label: 'Christmas / Winter', href: '/collections/christmas-winter' },
          { label: 'Spring / Easter', href: '/collections/spring-easter' },
          { label: "Valentine's Day", href: '/collections/valentines-day' },
          { label: "St. Patrick's Day", href: '/collections/st-pats-day' },
          { label: 'Red White Blue', href: '/collections/red-white-blue' },
        ],
      },
    ],
  },
  {
    label: 'Lifestyle',
    columns: [
      {
        heading: 'Lifestyle',
        links: [
          { label: 'Moms', href: '/collections/moms' },
          { label: 'Coffee Lovers', href: '/collections/coffee-lovers' },
          { label: 'Michigan Made', href: '/collections/michigan-made' },
          { label: 'Reading', href: '/collections/reading' },
          { label: 'Teacher / School', href: '/collections/teacher-school' },
          { label: 'Kids', href: '/collections/kids' },
          { label: 'Homestead / Farm', href: '/collections/homestead-farm' },
          { label: 'Pet Lover', href: '/collections/pet-lover' },
          { label: 'Mens', href: '/collections/mens' },
        ],
      },
    ],
  },
  {
    label: 'Bundles',
    href: '/collections/family-sets',
  },
];