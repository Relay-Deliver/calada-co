const fs = require('fs');
let c = fs.readFileSync('src/pages/AboutPage.jsx', 'utf8');

// Fix gallery - remove megan from gallery, use family photos with correct filenames
c = c.replace(
  `const GALLERY = [
  { src: '/assets/Family photo.png', alt: 'Meagan and family' },
  { src: '/assets/Adalynn.png', alt: 'Adalynn' },
  { src: '/assets/Adalynn 2.png', alt: 'Adalynn' },
  { src: '/assets/Calvin.png', alt: 'Calvin' },
  { src: '/assets/Calvin 2.PNG', alt: 'Calvin' },
  { src: '/assets/IMG_8169.PNG', alt: 'CalAda family moment' },
];`,
  `const GALLERY = [
  { src: '/assets/Family%20photo.png', alt: 'Meagan and family' },
  { src: '/assets/Adalynn.png', alt: 'Adalynn' },
  { src: '/assets/Adalynn%202.png', alt: 'Adalynn' },
  { src: '/assets/Calvin.png', alt: 'Calvin' },
  { src: '/assets/Calvin%202.PNG', alt: 'Calvin' },
  { src: '/assets/IMG_8169.PNG', alt: 'CalAda family moment' },
];`
);

// Fix Meet Megan photo - replace stock photo with Meagan real photo
c = c.replace(
  'src="/assets/megan-kohn.PNG"',
  'src="/assets/megan-kohn.PNG"'
);

// Fix the studio-mama stock photo that is still showing on Meet Megan right side
c = c.replace(
  'src="/assets/hero/studio-mama-mini.png"',
  'src="/assets/megan-kohn.PNG"'
);

fs.writeFileSync('src/pages/AboutPage.jsx', c, 'utf8');
console.log('done');
