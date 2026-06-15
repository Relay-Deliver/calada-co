// Bundle definitions — each pulls products from the listed Shopify collections.
// Shopify automatic discount handles the actual price reduction at checkout.
export const BUNDLES = {
  'coffee-lovers': {
    handle: 'coffee-lovers',
    title: 'Coffee Lovers Bundle',
    tagline: 'Save up to 30%',
    description: 'Build your perfect coffee-lover set — mix mama favorites with cozy staples and save more the more you add.',
    heroImage: '/assets/hero/flower-market.png',
    sourceCollections: ['coffee-lovers', 'moms'],
  },
  'fall': {
    handle: 'fall',
    title: 'Fall Bundle',
    tagline: 'Save up to 30%',
    description: 'Cozy up the whole family for fall — pair kids and seasonal pieces to build your bundle.',
    heroImage: '/assets/hero/porch-family.png',
    sourceCollections: ['fall', 'kids'],
  },
};

export const BUNDLE_LIST = Object.values(BUNDLES);

// Discount tiers — display only; Shopify applies the real discount at checkout
export const BUNDLE_TIERS = [
  { min: 3, max: 4, label: '3–4 Items', off: '15% OFF' },
  { min: 5, max: 5, label: '5 Items',   off: '20% OFF' },
  { min: 6, max: 99, label: '6+ Items', off: '30% OFF' },
];

export function getTierForCount(count) {
  if (count >= 6) return BUNDLE_TIERS[2];
  if (count === 5) return BUNDLE_TIERS[1];
  if (count >= 3) return BUNDLE_TIERS[0];
  return null;
}