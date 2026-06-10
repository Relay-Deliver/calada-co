const fs = require('fs');
let c = fs.readFileSync('src/pages/AboutPage.jsx', 'utf8');

c = c.replace(/const GALLERY = \[[\s\S]*?\];/, `const GALLERY = [
  { src: '/assets/family-photo.png', alt: 'Meagan and family' },
  { src: '/assets/adalynn.png', alt: 'Adalynn' },
  { src: '/assets/adalynn-2.png', alt: 'Adalynn' },
  { src: '/assets/calvin.png', alt: 'Calvin' },
  { src: '/assets/calvin-2.png', alt: 'Calvin' },
  { src: '/assets/family-2.png', alt: 'CalAda family moment' },
];`);

c = c.replace(/src="\/assets\/hero\/studio-mama-mini\.png"/g, 'src="/assets/megan-kohn.png"');
c = c.replace(/src="\/assets\/megan-kohn\.PNG"/g, 'src="/assets/megan-kohn.png"');

fs.writeFileSync('src/pages/AboutPage.jsx', c, 'utf8');
console.log('gallery:', c.includes('family-photo.png'));
console.log('founder:', c.includes('megan-kohn.png'));
