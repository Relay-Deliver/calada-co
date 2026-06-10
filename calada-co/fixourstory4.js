const fs = require('fs');
let v = fs.readFileSync('src/data/visuals.js', 'utf8');
console.log('Current image:', v.match(/Our Story[\s\S]{0,150}/)[0]);
v = v.replace(/image: '\/assets\/[^']*'/,  "image: '/assets/family.png'");
fs.writeFileSync('src/data/visuals.js', v, 'utf8');
console.log('Fixed to:', v.match(/Our Story[\s\S]{0,150}/)[0]);
