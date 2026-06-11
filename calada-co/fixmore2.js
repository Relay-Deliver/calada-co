const fs = require('fs');

// Fix 1 - Hide intro column on More menu
let n = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

n = n.replace(
  '<div className="mx-auto grid max-w-screen-2xl grid-cols-[0.8fr_1.5fr] gap-8 px-8 py-7">\r\n                <div className="max-w-sm">',
  '<div className={`mx-auto grid max-w-screen-2xl ${activeMenu?.key === \'more\' ? \'grid-cols-1\' : \'grid-cols-[0.8fr_1.5fr]\'} gap-8 px-8 py-7`}>\r\n                {activeMenu?.key !== \'more\' && (\r\n                <div className="max-w-sm">'
);

n = n.replace(
  "{activeMenu?.key === 'more' ? 'Learn more' : 'Shop now'}\r\n                  </Link>\r\n                </div>",
  "{activeMenu?.key === 'more' ? 'Learn more' : 'Shop now'}\r\n                  </Link>\r\n                </div>\r\n                )}"
);

fs.writeFileSync('src/components/layout/Navbar.jsx', n, 'utf8');
console.log('navbar:', n.includes("activeMenu?.key !== 'more'"));

// Fix 2 - Gift card image fits fully on product page
let p = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');
p = p.replace(
  '<motion.img\r\n                key={selectedImg}',
  "<motion.img\r\n                key={selectedImg}\r\n                style={product.title?.toLowerCase().includes('gift') ? { objectFit: 'contain', background: '#fff' } : undefined}"
);
fs.writeFileSync('src/pages/ProductPage.jsx', p, 'utf8');
console.log('product image:', p.includes("objectFit: 'contain'"));
