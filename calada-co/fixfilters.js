const fs = require('fs');
let c = fs.readFileSync('src/pages/ShopPage.jsx', 'utf8');

c = c.replace(
`    // Price filter
    next = next.filter(p => {
      const price = Number(p.priceRange?.minVariantPrice?.amount || 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    return next;`,
`    // Price filter
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

    return next;`
);

fs.writeFileSync('src/pages/ShopPage.jsx', c, 'utf8');
console.log('filters done:', c.includes('selectedSizes.length > 0'));
