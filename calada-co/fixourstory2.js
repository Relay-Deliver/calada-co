const fs = require('fs');
let c = fs.readFileSync('src/data/visuals.js', 'utf8');
const idx = c.indexOf("title: 'Our Story'");
console.log('Current Our Story section:');
console.log(c.substring(idx, idx+200));
