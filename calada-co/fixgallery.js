const fs = require('fs');
let c = fs.readFileSync('src/pages/AboutPage.jsx', 'utf8');

// Change gallery image rendering to object-contain with white bg so full photos show
c = c.replace(
  'className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"',
  'className="w-full h-full object-contain bg-[#fdf4f7] hover:scale-105 transition-transform duration-500"'
);

fs.writeFileSync('src/pages/AboutPage.jsx', c, 'utf8');
console.log('done:', c.includes('object-contain'));
