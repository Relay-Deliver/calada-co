const fs = require('fs');
let c = fs.readFileSync('src/data/visuals.js', 'utf8');
c = c.replace("image: '/assets/family.png'", "image: '/assets/hero/boutique-rack.png'");
fs.writeFileSync('src/data/visuals.js', c, 'utf8');
console.log('done:', c.includes('boutique-rack'));
