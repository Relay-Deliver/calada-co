import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import CartDrawer from '../cart/CartDrawer';
import { NAV_MENUS } from '../../data/visuals';

const HEADER_NAV = Object.entries(NAV_MENUS).map(([key, menu]) => ({ key, ...menu }));

const SearchIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" strokeLinecap="round" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="22" height="22" fill={filled ? '#D4537E' : 'none'} stroke={filled ? '#D4537E' : 'currentColor'} strokeWidth="1.8" viewBox="0 0 24 24">
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
const LogoMark = ({ className = '' }) => (
  <span className={`grid place-items-center   bg-navy shadow-sm ring-1 ring-navy/10 ${className}`}>
    <img
      src="/assets/cal.png"
      alt="CalAda & Co."
      className="h-full w-full scale-[1.18] object-cover"
    />
  </span>
);

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [activeMenuKey, setActiveMenuKey] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedKey, setMobileExpandedKey] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const activeMenu = HEADER_NAV.find(menu => menu.key === activeMenuKey);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setActiveMenuKey(null);
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
        {/* DESKTOP BAR */}
        <div className="mx-auto hidden h-[86px] max-w-screen-2xl grid-cols-[84px_minmax(0,1fr)_168px] items-center gap-4 px-5 xl:grid 2xl:px-8">

          <Link to="/" className="grid h-[70px] w-[70px] place-items-center " onMouseEnter={() => setActiveMenuKey(null)}>
            <LogoMark className="h-14 w-auto" />
          </Link>

          <ul className="flex min-w-0 items-center justify-center gap-3 2xl:gap-6">
            {HEADER_NAV.map((menu) => (
              <li key={menu.key} className="relative">
                <Link
                  to={menu.to}
                  className={`block whitespace-nowrap px-1 py-3 text-[12px] font-black uppercase tracking-[0.1em] transition-colors hover:text-[#c084a0] 2xl:text-[13px] 2xl:tracking-[0.12em] ${activeMenuKey === menu.key ? 'text-[#c084a0]' : 'text-slate-500'}`}
                  onMouseEnter={() => setActiveMenuKey(menu.key)}
                  onFocus={() => setActiveMenuKey(menu.key)}
                  onClick={() => setActiveMenuKey(null)}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-1 text-navy">
            <button className="relative grid h-10 w-10 place-items-center transition-colors hover:text-[#c084a0]" onClick={() => setSearchOpen(o => !o)} aria-label="Search">
              <SearchIcon />
            </button>
            <Link to="/account/wishlist" className="relative grid h-10 w-10 place-items-center transition-colors hover:text-[#c084a0]" aria-label="Wishlist">
              <HeartIcon filled={wishlistCount > 0} />
              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center  bg-[#c084a0] px-1 text-[10px] font-bold leading-none text-white">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <Link to={isLoggedIn ? '/account' : '/account/login'} className="relative grid h-10 w-10 place-items-center transition-colors hover:text-[#c084a0]" aria-label="Account">
              <AccountIcon />
            </Link>
            <button className="relative grid h-10 w-10 place-items-center transition-colors hover:text-[#c084a0]" onClick={openCart} aria-label="Cart">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center  bg-[#c084a0] px-1 text-[10px] font-bold leading-none text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE BAR */}
        <div className="relative flex h-[74px] items-center justify-between px-3 sm:h-[80px] sm:px-5 xl:hidden">
          <button className="relative z-10 grid h-10 w-10 place-items-center text-navy" onClick={() => setMobileOpen(o => !o)} aria-label="Menu" aria-expanded={mobileOpen}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <Link
            to="/"
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center  sm:h-16 sm:w-16"
            onClick={() => setMobileOpen(false)}
          >
            <LogoMark className="h-full w-full" />
          </Link>
          <div className="relative z-10 flex items-center justify-end gap-0 text-navy sm:gap-1">
            <Link to="/account/wishlist" className="relative grid h-9 w-9 place-items-center transition-colors hover:text-[#c084a0] sm:h-10 sm:w-10" aria-label="Wishlist">
              <HeartIcon filled={wishlistCount > 0} />
              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center  bg-[#c084a0] px-1 text-[9px] font-bold leading-none text-white">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <button className="relative grid h-9 w-9 place-items-center transition-colors hover:text-[#c084a0] sm:h-10 sm:w-10" onClick={() => setSearchOpen(o => !o)} aria-label="Search">
              <SearchIcon />
            </button>
            <button className="relative grid h-9 w-9 place-items-center transition-colors hover:text-[#c084a0] sm:h-10 sm:w-10" onClick={openCart} aria-label="Cart">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center  bg-[#c084a0] px-1 text-[9px] font-bold leading-none text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-3 shadow-md">
            <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl items-center gap-2">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="min-w-0 flex-1  border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#c084a0] focus:ring-2 focus:ring-[#c084a0]/20"
              />
              <button type="submit" className=" bg-[#c084a0] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a8607e]">
                Search
              </button>
            </form>
          </div>
        )}

        {/* DESKTOP MEGA MENU */}
        {activeMenu && (
          <div
            className="absolute left-0 right-0 top-full z-50 hidden border-t border-gray-100 bg-white shadow-xl xl:block"
            onMouseLeave={() => setActiveMenuKey(null)}
          >
            {activeMenu.groups ? (
              // Collections — grouped layout
              <div className="mx-auto max-w-screen-2xl px-8 py-7">
                <div className="mb-5 flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c084a0]">Explore</p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold text-navy">Collections</h3>
                  </div>
                  <Link
                    to="/collections"
                    className="border-b-2 border-navy pb-0.5 text-[11px] font-black uppercase tracking-[0.18em] text-navy transition-colors hover:border-[#c084a0] hover:text-[#c084a0]"
                    onClick={() => setActiveMenuKey(null)}
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {activeMenu.groups.map(group => (
                    <div key={group.heading}>
                      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-navy">{group.heading}</p>
                      <ul className="grid gap-1.5">
                        {group.links.map(link => (
                          <li key={link.to}>
                            <Link
                              to={link.to}
                              className="text-sm text-slate-500 transition-colors hover:text-[#c084a0]"
                              onClick={() => setActiveMenuKey(null)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Standard card layout
              <div className="mx-auto grid max-w-screen-2xl grid-cols-[0.8fr_1.5fr] gap-8 px-8 py-7">
                <div className="max-w-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c084a0]">Explore</p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-navy">{activeMenu.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Fresh boutique picks for mothers, families, and little ones.
                  </p>
                  <Link
                    to={activeMenu.to}
                    className="mt-5 inline-flex border-b-2 border-navy pb-1 text-[11px] font-black uppercase tracking-[0.18em] text-navy transition-colors hover:border-[#c084a0] hover:text-[#c084a0]"
                    onClick={() => setActiveMenuKey(null)}
                  >
                    {activeMenu?.key === 'more' ? 'Learn more' : 'Shop now'}
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {activeMenu.cards?.map(card => (
                    <Link
                      key={card.title}
                      to={card.to}
                      className="group grid grid-cols-[120px_1fr]  rounded-lg border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                      onClick={() => setActiveMenuKey(null)}
                    >
                      <img src={card.image} alt="" className="h-full min-h-[132px] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="flex flex-col justify-center p-5">
                        <span className="font-serif text-xl font-semibold text-navy">{card.title}</span>
                        <span className="mt-1 text-sm text-slate-500">{card.caption}</span>
                        <span className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#c084a0]">{card.cta || "Learn more"}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MOBILE MENU DRAWER */}
        {mobileOpen && (
          <div className="max-h-[calc(100vh-74px)] overflow-y-auto border-t border-gray-100 bg-white px-4 py-4 shadow-lg sm:max-h-[calc(100vh-80px)] xl:hidden">
            <ul className="grid gap-1">
              {HEADER_NAV.map((menu) => (
                <li key={menu.key}>
                  {menu.groups ? (
                    <div>
                      <button
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-black uppercase tracking-[0.12em] text-slate-600 hover:bg-pink-50 hover:text-[#c084a0]"
                        onClick={() => setMobileExpandedKey(mobileExpandedKey === menu.key ? null : menu.key)}
                      >
                        <span>{menu.label}</span>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                          style={{ transform: mobileExpandedKey === menu.key ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/>
                        </svg>
                      </button>
                      {mobileExpandedKey === menu.key && (
                        <div className="mb-2 ml-3 grid gap-4 rounded-lg bg-slate-50 p-4">
                          {menu.groups.map(group => (
                            <div key={group.heading}>
                              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-navy">{group.heading}</p>
                              <ul className="grid gap-1.5">
                                {group.links.map(link => (
                                  <li key={link.to}>
                                    <Link
                                      to={link.to}
                                      className="text-sm text-slate-500 hover:text-[#c084a0]"
                                      onClick={() => { setMobileOpen(false); setMobileExpandedKey(null); }}
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={menu.to}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-black uppercase tracking-[0.12em] text-slate-600 hover:bg-pink-50 hover:text-[#c084a0]"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{menu.label}</span>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/>
                      </svg>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <ul className="mt-4 grid gap-1 border-t border-gray-100 pt-4">
              <li>
                <Link
                  to={isLoggedIn ? '/account' : '/account/login'}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-pink-50 hover:text-[#c084a0]"
                  onClick={() => setMobileOpen(false)}
                >
                  <AccountIcon />
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/account/wishlist"
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-pink-50 hover:text-[#c084a0]"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <HeartIcon filled={wishlistCount > 0} />
                    Wishlist
                  </span>
                  {wishlistCount > 0 && (
                    <span className=" bg-[#c084a0] px-2 py-0.5 text-xs font-bold text-white">
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
