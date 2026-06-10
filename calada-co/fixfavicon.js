const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
c = c.replace(/href="\/assets\/calada-logo[^"]*"/, 'href="/assets/cal.png"');
fs.writeFileSync('index.html', c, 'utf8');
console.log('done:', c.includes('cal.png'));
