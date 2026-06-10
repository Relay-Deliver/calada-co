const fs = require('fs');

// Fix Our Story image
let v = fs.readFileSync('src/data/visuals.js', 'utf8');
v = v.replace("image: '/assets/hero/porch-family.png'", "image: '/assets/family.png'");
fs.writeFileSync('src/data/visuals.js', v, 'utf8');
console.log('visuals done:', v.includes('/assets/family.png'));
