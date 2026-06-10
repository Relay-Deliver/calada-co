const fs = require('fs');
let c = fs.readFileSync('src/pages/AboutPage.jsx', 'utf8');

// Fix gallery to use real family photos
c = c.replace(
  `const GALLERY = [
  { src: '/assets/meagan-kohn.PNG', alt: 'Meagan Kohn - Founder of CalAda & Co' },
  { src: '/assets/hero/studio-mama-mini.png', alt: 'Mama and mini studio' },
  { src: '/assets/hero/flower-market.png', alt: 'Flower market' },
  { src: '/assets/hero/family-picnic.png', alt: 'Family picnic' },
  { src: '/assets/hero/boutique-rack.png', alt: 'Boutique clothing rack' },
  { src: '/assets/hero/beach-child.png', alt: 'Child at the beach' },
];`,
  `const GALLERY = [
  { src: '/assets/Family photo.png', alt: 'Meagan and family' },
  { src: '/assets/Adalynn.png', alt: 'Adalynn' },
  { src: '/assets/Adalynn 2.png', alt: 'Adalynn' },
  { src: '/assets/Calvin.png', alt: 'Calvin' },
  { src: '/assets/Calvin 2.PNG', alt: 'Calvin' },
  { src: '/assets/IMG_8169.PNG', alt: 'CalAda family moment' },
];`
);

// Fix Meet Megan founder photo
c = c.replace(
  'src="/assets/megan-kohn.PNG"',
  'src="/assets/megan-kohn.PNG"'
);

fs.writeFileSync('src/pages/AboutPage.jsx', c, 'utf8');
console.log('done:', c.includes('Family photo.png'));
