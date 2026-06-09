const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');

const oldMap = `const COLOR_MAP = {
  black: '#111', white: '#fff', red: '#ef4444', blue: '#3b82f6',
  navy: '#1e3a5f', pink: '#ec4899', green: '#22c55e', yellow: '#eab308',
  purple: '#a855f7', orange: '#f97316', grey: '#9ca3af', gray: '#9ca3af',
  cream: '#fef3c7', ivory: '#fffff0', blush: '#ffb6c1', lavender: '#e6e6fa',
  sage: '#b2c9a0', teal: '#14b8a6', coral: '#ff6b6b', mint: '#98d8c8',
};`;

const newMap = `const COLOR_MAP = {
  black: '#111111', white: '#ffffff', red: '#ef4444', blue: '#3b82f6',
  navy: '#1e3a5f', pink: '#ec4899', green: '#22c55e', yellow: '#eab308',
  purple: '#a855f7', orange: '#f97316', grey: '#9ca3af', gray: '#9ca3af',
  cream: '#fef3c7', ivory: '#fffff0', blush: '#ffb6c1', lavender: '#e6e6fa',
  sage: '#b2c9a0', teal: '#14b8a6', coral: '#ff6b6b', mint: '#98d8c8',
  brown: '#92400e', tan: '#d4b483', beige: '#f5f0e8', maroon: '#7f1d1d',
  burgundy: '#800020', forest: '#228b22', olive: '#6b7c3f', mustard: '#d4a017',
  charcoal: '#4b5563', heather: '#b0a8b9', saltwater: '#4a9ead', aqua: '#00bcd4',
  turquoise: '#40e0d0', sand: '#c2b280', stone: '#8c8c8c', slate: '#64748b',
  denim: '#1560bd', indigo: '#4f46e5', rose: '#f43f5e', mauve: '#e0b0c8',
  lilac: '#c8a2c8', peach: '#ffcba4', mocha: '#967259', latte: '#c4a882',
  natural: '#f5f0e8', ash: '#b2bec3', smoke: '#9ca3af', cloud: '#f1f5f9',
  military: '#4a5240', camouflage: '#78866b', rust: '#b7410e', sienna: '#a0522d',
  copper: '#b87333', gold: '#ffd700', silver: '#c0c0c0', athletic: '#e5e7eb',
  vintage: '#d4c5a9', retro: '#c8956c', chambray: '#6d8dad', periwinkle: '#ccccff',
};`;

c = c.replace(oldMap, newMap);

const oldGetColorHex = `const getColorHex = (val) => {
  const key = val.toLowerCase().split(/[\\s\\/]/)[0];
  return COLOR_MAP[key] || null;
};`;

const newGetColorHex = `const getColorHex = (val) => {
  const normalized = val.toLowerCase().replace(/\\s+/g, '');
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (normalized.includes(key)) return hex;
  }
  return null;
};`;

c = c.replace(oldGetColorHex, newGetColorHex);

fs.writeFileSync('src/pages/ProductPage.jsx', c, 'utf8');
console.log('done');
