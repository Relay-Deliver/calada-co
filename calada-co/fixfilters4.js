const fs = require('fs');
let c = fs.readFileSync('src/pages/ShopPage.jsx', 'utf8');

c = c.replace(
  `      return price >= priceRange[0] && price <= priceRange[1];
    });
    return next;
  }, [products, sort, priceRange]);`,
  `      return price >= priceRange[0] && price <= priceRange[1];
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
        const title = (p.title || '').toLowerCase();
        return selectedAgeGroups.some(age => {
          const a = age.toLowerCase();
          if (a === 'adults') return tags.some(t => ['moms','mens','womens','adults','mom','women','men','adult'].includes(t)) || !tags.some(t => ['kids','youth','toddler','baby','infant','children'].includes(t));
          if (a === 'kids') return tags.some(t => ['kids','youth','children','child','kid'].includes(t)) || title.includes('kid') || title.includes('youth');
          if (a === 'toddlers') return tags.some(t => ['toddler','toddlers'].includes(t)) || title.includes('toddler');
          if (a === 'babies') return tags.some(t => ['baby','babies','infant','newborn'].includes(t)) || title.includes('baby') || title.includes('infant');
          if (a === 'teens') return tags.some(t => ['teen','teens','teenage'].includes(t)) || title.includes('teen');
          return tags.includes(a);
        });
      });
    }

    return next;
  }, [products, sort, priceRange, selectedSizes, selectedAgeGroups]);`
);

fs.writeFileSync('src/pages/ShopPage.jsx', c, 'utf8');
console.log('done:', c.includes('Age group filter'));
