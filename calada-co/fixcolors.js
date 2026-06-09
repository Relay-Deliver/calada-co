const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');

const newMap = `const COLOR_MAP = {
  // Basics
  black: '#111111', white: '#ffffff', red: '#cc0000', grey: '#9ca3af', gray: '#9ca3af',
  navy: '#1a2744', pink: '#ec4899', green: '#22c55e', yellow: '#eab308',
  purple: '#a855f7', orange: '#f97316', blue: '#3b82f6', brown: '#7c4b2a',

  // Greens
  'alpine green': '#3a5a40', alpine: '#3a5a40', basil: '#4a7c59', bay: '#4a7a6d',
  forest: '#2d5a27', 'forest green': '#2d5a27', emerald: '#047857', sage: '#b2c9a0',
  'irish green': '#169b62', 'island green': '#2ecc71', 'military green': '#4a5240',
  military: '#4a5240', military_green: '#4a5240', 'vintage military green': '#3d5229',
  'light green': '#86efac', 'green earth': '#6b8f5e', mint: '#98d8c8', 'mint green': '#98d8c8',
  'neo mint': '#a8e6cf', 'neon green': '#39ff14', 'safety green': '#00ff00',
  moss: '#8a9a5b', 'cypress green': '#3d6b4f', 'heather dark green': '#2d4a35',
  'heather forest': '#355e3b', 'chalky mint': '#b5e8d5', 'blue spruce': '#4a7b8c',

  // Blues
  'arctic blue': '#7ec8e3', 'blue jean': '#5b7fa6', chambray: '#6d8dad',
  'carolina blue': '#56a0d3', caribbean: '#00aacc', denim: '#1560bd',
  indigo: '#4f46e5', 'indigo blue': '#3949ab', 'dusty blue': '#7ba7bc',
  'ice blue': '#b0d4e3', 'light blue': '#93c5fd', 'flo blue': '#3a86ff',
  lagoon: '#5ba4b4', 'pacific blue': '#009dc4', pacific: '#009dc4',
  periwinkle: '#ccccff', royal: '#4169e1', 'royal caribbean': '#0077b6',
  'true royal': '#3b5998', 'heather royal': '#4a6fa5', 'heather navy': '#1e3a5f',
  'heather dark navy': '#162032', 'heather true royal': '#3b5998',
  'heather sport royal': '#4169e1', sky: '#87ceeb', oceanside: '#0077b6',
  'lavender blue': '#8080ff', 'heather deep teal': '#2a7f7f', cobalt: '#1e40af',

  // Reds & Pinks
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

  // Purples
  'deep purple': '#4a0e8f', orchid: '#da70d6', lavender: '#e6e6fa',
  'dark lavender': '#967bb6', violet: '#7f00ff', amethyst: '#9b59b6',
  'neon purple': '#bc13fe', 'neon violet': '#8b00ff', mauve: '#e0b0c8',
  mauvelous: '#ef98aa', 'heather mauve': '#c4a0b0', 'heather team purple': '#6b3fa0',
  grape: '#6f2da8', 'heather radiant orchid': '#b163a3', hydrangea: '#b8a9c9',

  // Yellows & Oranges
  mustard: '#d4a017', 'heather mustard': '#c49a0a', butter: '#f5d547',
  banana: '#ffe135', 'bright orange': '#ff6700', 'burnt orange': '#cc5500',
  'texas orange': '#bf5700', 'neon lemon': '#fff44f', cantaloupe: '#ff8c69',
  cantaloup: '#ff8c69', 'neon cantaloupe': '#ffa500', mango: '#ff8c00',
  'mango dream': '#ffb347', lemon: '#fff44f', peach: '#ffcba4', peachy: '#ffcba4',
  apricot: '#fbceb1', sunset: '#fd7c6e', 'heather sunset': '#f4a460', autumn: '#d2691e',

  // Browns & Neutrals
  tan: '#d4b483', sand: '#c2b280', khaki: '#c3b091', bone: '#e3dac9',
  ivory: '#fffff0', cream: '#fef3c7', natural: '#f5f0e8', oatmeal: '#d4c5a9',
  parchment: '#f5e6ca', latte: '#c4a882', mocha: '#967259', chocolate: '#7b3f00',
  espresso: '#4b2c20', 'dark chocolate': '#3c1a0e', burro: '#c4a882',
  'brown sugar': '#a0522d', 'coyote brown': '#81613c', 'brown savana': '#8b6914',
  java: '#5a3825', 'washed natural': '#ede8d0', 'off white': '#f8f5f0',
  'sweet cream heather': '#f5f0e8', hemp: '#8c7b6b',

  // Greys & Blacks
  charcoal: '#4b5563', graphite: '#6b7280', granite: '#808080',
  'sport grey': '#a8aaad', 'athletic grey': '#a8aaad', 'athletic heather': '#b0adb0',
  ash: '#b2bec3', smoke: '#9ca3af', 'vintage smoke': '#a0a0a0',
  asphalt: '#4a4a4a', oxford: '#4a4f5a', pepper: '#5a5a5a', stone: '#8c8c8c',
  'heather stone': '#9e9e9e', 'heather ash': '#c4c4c4', 'heather grey': '#b0b0b0',
  'dark grey heather': '#4a4a4a', 'deep heather': '#5a5a5a', titanium: '#878681',
  'vintage black': '#2a2a2a', storm: '#708090', strobe: '#c8c8c8',
  'granite heather': '#909090', 'mineral black': '#1a1a1a', 'mineral grey': '#7a7a7a',

  // Special
  saltwater: '#4a9ead', heather: '#b0a8b9', teal: '#14b8a6', turquoise: '#40e0d0',
  'spider turquoise': '#40c0b0', seafoam: '#9fe2bf', aqua: '#00bcd4',
  'heather dark teal': '#2a7f7f', 'island reef': '#00b4d8',
  lime: '#84cc16', apple: '#8db600', jade: '#00a86b', 'jade dome': '#00a86b',
  'washed basil': '#5a7a6a', greenstone: '#4a7a6a',
  'faded seaglass': '#a8d8d4', terracotta: '#e07150', copper: '#b87333',
  gold: '#ffd700', silver: '#c0c0c0', 'rose sand': '#c09090',
  'bleached linen': '#faf0e6', 'heather oatmeal': '#d4c5a9',
  'light pink heather': '#ffb6c1', 'future dusk': '#4a4a6a',
  'heather charity pink': '#ff9eb5', 'heather scarlet red': '#ff2400',
  'heather dust': '#c4b9a8', 'heather heliconia pink': '#df3079',
};`;

c = c.replace(/const COLOR_MAP = \{[\s\S]*?\};/, newMap);

fs.writeFileSync('src/pages/ProductPage.jsx', c, 'utf8');
console.log('done, saltwater:', c.includes('saltwater'));
console.log('alpine green:', c.includes('alpine green'));
