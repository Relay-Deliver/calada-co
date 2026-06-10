const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

// Add account icon before cart in mobile bar
c = c.replace(
  `<button className="relative grid h-9 w-9 place-items-center transition-colors hover:text-[#c084a0] sm:h-10 sm:w-10" onClick={openCart} aria-label="Cart">`,
  `<Link to="/account" className="relative grid h-9 w-9 place-items-center transition-colors hover:text-[#c084a0] sm:h-10 sm:w-10" aria-label="Account">
              <AccountIcon />
            </Link>
            <button className="relative grid h-9 w-9 place-items-center transition-colors hover:text-[#c084a0] sm:h-10 sm:w-10" onClick={openCart} aria-label="Cart">`
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('Account'));
