const fs = require('fs');
let c = fs.readFileSync('src/data/visuals.js', 'utf8');
c = c.replace(/\s*\{[^}]*label:\s*['"]Drinks['"][^}]*\},?/g, '');
c = c.replace(/\s*\{[^}]*label:\s*['"]Snacks['"][^}]*\},?/g, '');
fs.writeFileSync('src/data/visuals.js', c, 'utf8');
console.log('done');
