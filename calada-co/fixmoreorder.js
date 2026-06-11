const fs = require('fs');
let c = fs.readFileSync('src/data/visuals.js', 'utf8');

const giftStart = c.indexOf("{\r\n        title: 'Gift Cards'") !== -1 ? c.indexOf("{\r\n        title: 'Gift Cards'") : c.lastIndexOf('{', c.indexOf("title: 'Gift Cards'"));
const giftEnd = c.indexOf('},', giftStart) + 2;
const giftBlock = c.substring(giftStart, giftEnd);

// Remove gift block from current position
c = c.substring(0, giftStart) + c.substring(giftEnd);

// Insert before Our Story
const storyIdx = c.lastIndexOf('{', c.indexOf("title: 'Our Story'"));
c = c.substring(0, storyIdx) + giftBlock + '\r\n      ' + c.substring(storyIdx);

fs.writeFileSync('src/data/visuals.js', c, 'utf8');
const gi = c.indexOf("title: 'Gift Cards'");
const oi = c.indexOf("title: 'Our Story'");
const ci = c.indexOf("title: 'Contact Us'");
console.log('Order correct (Gift < Story < Contact):', gi < oi && oi < ci);
