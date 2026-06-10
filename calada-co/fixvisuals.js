const fs = require('fs');
let c = fs.readFileSync('src/data/visuals.js', 'utf8');

// Add cta field to More menu cards
c = c.replace(
  `title: 'Our Story',
        caption: 'Meet CalAda & Co',
        to: '/about',
        image: '/assets/hero/porch-family.png',`,
  `title: 'Our Story',
        caption: 'Meet CalAda & Co',
        to: '/about',
        image: '/assets/hero/porch-family.png',
        cta: 'Learn more',`
);

c = c.replace(
  `title: 'Contact Us',
        caption: 'Questions, sizing, and support',
        to: '/contact',
        image: '/assets/hero/flower-market.png',`,
  `title: 'Contact Us',
        caption: 'Questions, sizing, and support',
        to: '/contact',
        image: '/assets/hero/flower-market.png',
        cta: 'Get in touch',`
);

fs.writeFileSync('src/data/visuals.js', c, 'utf8');
console.log('done:', c.includes('Learn more'));
