const fs = require('fs');
let c = fs.readFileSync('src/components/layout/CountdownBanner.jsx', 'utf8');

// Clear any old localStorage value and always use July 1
c = c.replace(
  "const TARGET = new Date('2026-07-01T00:00:00');",
  `try { localStorage.removeItem('calada_countdown_target'); } catch(e) {}
const TARGET = new Date('2026-07-01T00:00:00');`
);

fs.writeFileSync('src/components/layout/CountdownBanner.jsx', c, 'utf8');
console.log('done:', c.includes('removeItem'));
