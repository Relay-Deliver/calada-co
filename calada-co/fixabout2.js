const fs = require('fs');
let c = fs.readFileSync('src/pages/AboutPage.jsx', 'utf8');

// Replace founder photo
c = c.replace(
  'src="/assets/hero/studio-mama-mini.png"',
  'src="/assets/meagan-kohn.PNG"'
);

// Replace first gallery image
c = c.replace(
  "{ src: '/assets/hero/porch-family.png', alt: 'Family on porch' }",
  "{ src: '/assets/meagan-kohn.PNG', alt: 'Meagan Kohn - Founder of CalAda & Co' }"
);

fs.writeFileSync('src/pages/AboutPage.jsx', c, 'utf8');
console.log('done:', c.includes('meagan-kohn'));
