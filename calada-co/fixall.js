const fs = require('fs');

// Fix 1 - Countdown timer
let t = fs.readFileSync('src/components/layout/CountdownBanner.jsx', 'utf8');
t = t.replace(
  'onst TARGET = new Date();\nTARGET.setDate(TARGET.getDate() + 30);',
  `onst getTarget = () => {
  try {
    const stored = localStorage.getItem('calada_countdown_target');
    if (stored) return new Date(stored);
  } catch(e) {}
  const d = new Date();
  d.setDate(d.getDate() + 30);
  try { localStorage.setItem('calada_countdown_target', d.toISOString()); } catch(e) {}
  return d;
};
const TARGET = getTarget();`
);
fs.writeFileSync('src/components/layout/CountdownBanner.jsx', t, 'utf8');
console.log('timer:', t.includes('getTarget'));

// Fix 2 - ShopPage filters
let s = fs.readFileSync('src/pages/ShopPage.jsx', 'utf8');
s = s.replace(
  '  // Price filter\n    next = next.filter(p => {\n      const price = Number(p.priceRange?.minVariantPrice?.amount || 0);\n      return price >= priceRange[0] && price <= priceRange[1];\n    });\n    retur',
  `  // Price filter
    next = next.filter(p => {
      const price = Number(p.priceRange?.minVariantPrice?.amount || 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Size filter
    if (selectedSizes.length > 0) {
      next = next.filter(p => {
        const variants = p.variants?.edges?.map(e => e.node) || [];
        return variants.some(v =>
          v.selectedOptions?.some(o =>
            o.name.toLowerCase() === 'size' &&
            selectedSizes.some(s => s.toLowerCase() === o.value.toLowerCase())
          )
        );
      });
    }

    // Age group filter
    if (selectedAgeGroups.length > 0) {
      next = next.filter(p => {
        const tags = (p.tags || []).map(t => t.toLowerCase());
        return selectedAgeGroups.some(age => {
          const a = age.toLowerCase();
          return tags.includes(a) ||
            (a === 'adults' && (tags.includes('moms') || tags.includes('womens') || tags.includes('mens'))) ||
            (a === 'kids' && (tags.includes('kids') || tags.includes('youth'))) ||
            (a === 'toddlers' && tags.includes('toddler')) ||
            (a === 'babies' && tags.includes('baby')) ||
            (a === 'teens' && tags.includes('teen'));
        });
      });
    }

    retur`
);
fs.writeFileSync('src/pages/ShopPage.jsx', s, 'utf8');
console.log('filters:', s.includes('selectedSizes.length > 0'));
