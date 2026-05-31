import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import CartDrawer from '../cart/CartDrawer';
import { navMenus } from '../../data/visuals';

const SearchIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" strokeLinecap="round" />
  </svg>
);
const HeartIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const AccountIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
  </svg>
);
const CartIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
    <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
    <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
  </svg>
);

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setActiveMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={menuRef}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      >
        {/* ── Main bar ── */}
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-8">

          {/* LEFT: hamburger (mobile) or nav links (desktop) */}
          <div className="flex flex-1 items-center">
            {/* Mobile hamburger */}
            <button
              className="p-2 text-gray-700 lg:hidden"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex lg:items-center lg:gap-1">
              {navMenus.map((menu) => (
                <li key={menu.label} className="relative">
                  <button
                    className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:text-[#c084a0] ${activeMenu === menu.label ? 'text-[#c084a0]' : 'text-gray-700'}`}
                    onMouseEnter={() => menu.columns ? setActiveMenu(menu.label) : setActiveMenu(null)}
                    onClick={() => {
                      if (!menu.columns) { navigate(menu.href || '/shop'); setActiveMenu(null); }
                    }}
                  >
                    {menu.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER: Logo — always centered */}
          <div className="flex flex-1 justify-center">
            <Link to="/">
              <span className="font-['Playfair_Display',serif] text-xl font-bold tracking-wide text-[#c084a0] sm:text-2xl">
                CalAda &amp; Co
              </span>
            </Link>
          </div>

          {/* RIGHT: Icons */}
          <div className="flex flex-1 items-center justify-end gap-0">

            {/* Search */}
            <button
              className="relative p-2 text-gray-700 transition-colors hover:text-[#c084a0]"
              onClick={() => setSearchOpen(o => !o)}
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Wishlist — hidden on smallest screens, show from sm */}
            <Link
              to="/account/wishlist"
              className="relative hidden p-2 text-gray-700 transition-colors hover:text-[#c084a0] sm:block"
              aria-label="Wishlist"
            >
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#c084a0] text-[9px] font-bold leading-none text-white">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Account — hidden on mobile */}
            <Link
              to={isLoggedIn ? '/account' : '/account/login'}
              className="relative hidden p-2 text-gray-700 transition-colors hover:text-[#c084a0] sm:block"
              aria-label="Account"
            >
              <AccountIcon />
            </Link>

            {/* Cart — always visible */}
            <button
              className="relative p-2 text-gray-700 transition-colors hover:text-[#c084a0]"
              onClick={openCart}
              aria-label="Cart"
            >
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#c084a0] text-[9px] font-bold leading-none text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* ── Search bar dropdown ── */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-3 shadow-md">
            <form onSubmit={handleSearch} className="mx-auto flex max-w-xl items-center gap-2">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for products…"
                className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#c084a0] focus:ring-2 focus:ring-[#c084a0]/20"
              />
              <button
                type="submit"
                className="rounded-full bg-[#c084a0] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#b0728e]"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* ── Mega menu dropdown (desktop) ── */}
        {activeMenu && (
          <div
            className="absolute left-0 right-0 top-full z-50 border-t border-gray-100 bg-white shadow-xl"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="mx-auto max-w-7xl px-8 py-8">
              {navMenus
                .filter(m => m.label === activeMenu && m.columns)
                .map(menu => (
                  <div key={menu.label} className="grid grid-cols-4 gap-8">
                    {menu.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c084a0]">
                          {col.heading}
                        </p>
                        <ul className="space-y-2">
                          {col.links.map(link => (
                            <li key={link.label}>
                              <Link
                                to={link.href}
                                className="text-sm text-gray-600 transition-colors hover:text-[#c084a0]"
                                onClick={() => setActiveMenu(null)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ── Mobile menu drawer ── */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white lg:hidden">
            <ul className="divide-y divide-gray-100">
              {navMenus.map((menu) => (
                <li key={menu.label}>
                  <Link
                    to={menu.href || '/shop'}
                    className="block px-6 py-4 text-sm font-medium text-gray-700 hover:text-[#c084a0]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
              {/* Show account + wishlist in mobile menu since icons are hidden */}
              <li>
                <Link
                  to={isLoggedIn ? '/account' : '/account/login'}
                  className="block px-6 py-4 text-sm font-medium text-gray-700 hover:text-[#c084a0]"
                  onClick={() => setMobileOpen(false)}
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/account/wishlist"
                  className="flex items-center justify-between px-6 py-4 text-sm font-medium text-gray-700 hover:text-[#c084a0]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="rounded-full bg-[#c084a0] px-2 py-0.5 text-xs font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <CartDrawer />
    </>
  );
}