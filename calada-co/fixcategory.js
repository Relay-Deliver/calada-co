const fs = require('fs');
let c = fs.readFileSync('src/data/visuals.js', 'utf8');

// Replace family.png in New Arrivals tile with adalynn photo
c = c.replace(
  `label: 'New Arrivals',
    desc: 'Fresh pieces ready to add to your bag',
    to: '/collections/new-arrivals',
    image: '/assets/family.png',`,
  `label: 'New Arrivals',
    desc: 'Fresh pieces ready to add to your bag',
    to: '/collections/new-arrivals',
    image: '/assets/adalynn.png',`
);

fs.writeFileSync('src/data/visuals.js', c, 'utf8');
console.log('done:', c.includes("'New Arrivals'") && c.includes("adalynn.png"));
