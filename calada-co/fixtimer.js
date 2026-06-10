const fs = require('fs');
let c = fs.readFileSync('src/components/layout/CountdownBanner.jsx', 'utf8');
c = c.replace(
`const TARGET = new Date();
TARGET.setDate(TARGET.getDate() + 30);`,
`const getTarget = () => {
  const stored = localStorage.getItem('calada_countdown_target');
  if (stored) return new Date(stored);
  const t = new Date();
  t.setDate(t.getDate() + 30);
  localStorage.setItem('calada_countdown_target', t.toISOString());
  return t;
};
const TARGET = getTarget();`
);
fs.writeFileSync('src/components/layout/CountdownBanner.jsx', c, 'utf8');
console.log('timer done:', c.includes('localStorage'));
