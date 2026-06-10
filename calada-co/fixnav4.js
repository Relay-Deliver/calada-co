const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

// Replace Shop now in cards with card.cta fallback
c = c.replace(
  `>
                      Shop now
                    </Link>`,
  `>
                      {card.cta || 'Shop now'}
                    </Link>`
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('card.cta'));
