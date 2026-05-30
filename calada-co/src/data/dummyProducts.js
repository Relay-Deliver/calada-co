export const DUMMY_PRODUCTS = [
  {
    id: '1',
    handle: 'everyday-linen-top',
    title: 'Everyday Linen Top',
    tags: ['best-seller', 'women'],
    priceRange: { minVariantPrice: { amount: '38.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '52.00', currencyCode: 'USD' } },
    images: {
      edges: [
        { node: { url: '/assets/hero/flower-market.png', altText: 'Everyday Linen Top' } },
        { node: { url: '/assets/hero/boutique-rack.png', altText: 'Everyday Linen Top detail' } },
      ],
    },
    variants: { edges: [{ node: { id: 'dummy-variant-1' } }] },
  },
  {
    id: '2',
    handle: 'floral-midi-dress',
    title: 'Floral Midi Dress',
    tags: ['new', 'women'],
    priceRange: { minVariantPrice: { amount: '64.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: null },
    images: {
      edges: [
        { node: { url: '/assets/hero/porch-family.png', altText: 'Floral Midi Dress' } },
        { node: { url: '/assets/hero/flower-market.png', altText: 'Floral Midi Dress back' } },
      ],
    },
    variants: { edges: [{ node: { id: 'dummy-variant-2' } }] },
  },
  {
    id: '3',
    handle: 'kids-pima-tee',
    title: 'Kids Pima Cotton Tee',
    tags: ['new', 'children'],
    priceRange: { minVariantPrice: { amount: '22.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: null },
    images: {
      edges: [
        { node: { url: '/assets/hero/porch-family.png', altText: 'Kids Pima Tee' } },
        { node: { url: '/assets/hero/boutique-rack.png', altText: 'Kids Pima Tee detail' } },
      ],
    },
    variants: { edges: [{ node: { id: 'dummy-variant-3' } }] },
  },
  {
    id: '4',
    handle: 'mama-mini-matching-set',
    title: 'Mama & Mini Matching Set',
    tags: ['best-seller', 'family-sets'],
    priceRange: { minVariantPrice: { amount: '89.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '110.00', currencyCode: 'USD' } },
    images: {
      edges: [
        { node: { url: '/assets/hero/flower-market.png', altText: 'Mama & Mini Matching Set' } },
        { node: { url: '/assets/hero/porch-family.png', altText: 'Mama & Mini Matching Set back' } },
      ],
    },
    variants: { edges: [{ node: { id: 'dummy-variant-4' } }] },
  },
  {
    id: '5',
    handle: 'ruffle-sleeve-blouse',
    title: 'Ruffle Sleeve Blouse',
    tags: ['women'],
    priceRange: { minVariantPrice: { amount: '46.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: null },
    images: {
      edges: [
        { node: { url: '/assets/hero/flower-market.png', altText: 'Ruffle Sleeve Blouse' } },
        { node: { url: '/assets/hero/boutique-rack.png', altText: 'Ruffle Sleeve Blouse detail' } },
      ],
    },
    variants: { edges: [{ node: { id: 'dummy-variant-5' } }] },
  },
  {
    id: '6',
    handle: 'baby-smocked-romper',
    title: 'Baby Smocked Romper',
    tags: ['new', 'children'],
    priceRange: { minVariantPrice: { amount: '34.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: null },
    images: {
      edges: [
        { node: { url: '/assets/hero/porch-family.png', altText: 'Baby Smocked Romper' } },
        { node: { url: '/assets/hero/flower-market.png', altText: 'Baby Smocked Romper detail' } },
      ],
    },
    variants: { edges: [{ node: { id: 'dummy-variant-6' } }] },
  },
  {
    id: '7',
    handle: 'linen-wide-leg-pants',
    title: 'Linen Wide-Leg Pants',
    tags: ['best-seller', 'women'],
    priceRange: { minVariantPrice: { amount: '54.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '68.00', currencyCode: 'USD' } },
    images: {
      edges: [
        { node: { url: '/assets/hero/boutique-rack.png', altText: 'Linen Wide-Leg Pants' } },
        { node: { url: '/assets/hero/flower-market.png', altText: 'Linen Wide-Leg Pants back' } },
      ],
    },
    variants: { edges: [{ node: { id: 'dummy-variant-7' } }] },
  },
  {
    id: '8',
    handle: 'family-bundle-gift-set',
    title: 'Family Bundle Gift Set',
    tags: ['new', 'family-sets', 'gifts'],
    priceRange: { minVariantPrice: { amount: '128.00', currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '160.00', currencyCode: 'USD' } },
    images: {
      edges: [
        { node: { url: '/assets/hero/boutique-rack.png', altText: 'Family Bundle Gift Set' } },
        { node: { url: '/assets/hero/porch-family.png', altText: 'Family Bundle Gift Set detail' } },
      ],
    },
    variants: { edges: [{ node: { id: 'dummy-variant-8' } }] },
  },
];
