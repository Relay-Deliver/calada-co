const fs = require('fs');
let c = fs.readFileSync('src/data/visuals.js', 'utf8');
c = c.replace("image: '/assets/hero/porch-family.png'", "image: '/assets/family.png'");
fs.writeFileSync('src/data/visuals.js', c, 'utf8');
console.log('done:', c.includes("image: '/assets/family.png'"));
