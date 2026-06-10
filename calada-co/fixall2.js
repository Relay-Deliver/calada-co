const fs = require('fs');

// Fix 1 - New Arrivals tile image
let v = fs.readFileSync('src/data/visuals.js', 'utf8');
const idx = v.indexOf("label: 'New Arrivals'");
const imgIdx = v.indexOf("image:", idx);
const lineEnd = v.indexOf('\n', imgIdx);
v = v.substring(0, imgIdx) + "image: '/assets/hero/boutique-rack.png'," + v.substring(lineEnd);
fs.writeFileSync('src/data/visuals.js', v, 'utf8');
console.log('tile fixed:', v.substring(idx, idx+150).includes('boutique-rack'));

// Fix 2 - Remove X button and fix timer date on CountdownBanner
let b = fs.readFileSync('src/components/layout/CountdownBanner.jsx', 'utf8');

// Fix target date to July 1 2026
b = b.replace(/const TARGET = .*?;/, "const TARGET = new Date('2026-07-01T00:00:00');");

// Remove the close button and visible state
b = b.replace(/const \[visible, setVisible\] = useState\(true\);/, '');
b = b.replace(/if \(!visible\) return null;/, '');
b = b.replace(/<button[\s\S]*?aria-label="Close banner"[\s\S]*?<\/button>/, '');

fs.writeFileSync('src/components/layout/CountdownBanner.jsx', b, 'utf8');
console.log('banner fixed:', b.includes('2026-07-01'));
