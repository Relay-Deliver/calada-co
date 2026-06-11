const fs = require('fs');
let c = fs.readFileSync('src/data/visuals.js', 'utf8');

// Add Gift Cards card to More menu before Contact Us
const contactIdx = c.indexOf("title: 'Contact Us'");
if (contactIdx === -1) { console.log('Contact Us not found'); process.exit(1); }
// find the opening brace of the Contact Us card
const braceIdx = c.lastIndexOf('{', contactIdx);
const giftCard = `{
        title: 'Gift Cards',
        caption: 'The perfect gift for any occasion',
        to: '/products/calada-co-gift-card',
        image: '/assets/gift-card-front.png',
        cta: 'Shop gift cards',
      },
      `;
c = c.substring(0, braceIdx) + giftCard + c.substring(braceIdx);

fs.writeFileSync('src/data/visuals.js', c, 'utf8');
console.log('done:', c.includes("title: 'Gift Cards'"));
