import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartDrawer from '../cart/CartDrawer';
import { NAV_MENUS } from '../../data/visuals';

const NAV_ORDER = ['bundles', 'shop', 'collections', 'arrivals', 'bestSellers', 'more'];

function HeartLogo() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 35s-14.5-9.7-14.5-18a7.9 7.9 0 0 1 14.5-4.45A7.9 7.9 0 0 1 35.5 17c0 8.3-14.5 18-14.5 18z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8 17.6c0-2 1.35-3.35 3.35-3.35"
        stroke="#D4537E"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7.5" />
      <path strokeLinecap="round" d="m20 20-4.2-4.2" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <path d="M20 21v-1.8a4.2 4.2 0 0 0-4.2-4.2H8.2A4.2 4.2 0 0 0 4 19.2V21" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MegaMenu({ menu, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="absolute left-0 right-0 top-full z-50 border-y border-black/10 bg-white shadow-[0_28px_70px_rgba(15,23,42,0.12)]"
    >
      <div className="mx-auto grid max-w-screen-2xl grid-cols-[0.75fr_2fr] gap-10 px-10 py-10">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-pink">CalAda & Co</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-navy">{menu.label}</h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Explore thoughtful boutique pieces for family moments, warm days, and everyday comfort.
            </p>
          </div>
          <Link
            to={menu.to}
            onClick={onClose}
            className="mt-8 inline-flex w-fit border-b-2 border-navy pb-1 text-[12px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:border-pink hover:text-pink"
          >
            Shop this edit
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-7">
          {menu.cards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              onClick={onClose}
              className="group relative min-h-[285px] overflow-hidden rounded-[8px] bg-gray-100"
            >
              <motion.img
                src={card.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">{card.caption}</p>
                <p className="mt-2 text-2xl font-black uppercase tracking-[0.04em]">{card.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const [mobileKey, setMobileKey] = useState(null);

  useEffect(() => {
    setActiveKey(null);
    setMenuOpen(false);
    setMobileKey(null);
  }, [location.pathname]);

  const activeMenu = activeKey ? NAV_MENUS[activeKey] : null;

  return (
    <>
      <nav
        className="sticky top-0 z-[60] border-b border-black/10 bg-white"
        onMouseLeave={() => setActiveKey(null)}
      >
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-8">
          <div className="hidden h-[92px] items-center justify-between gap-8 md:flex">
            <Link to="/" className="group flex shrink-0 items-center gap-3 text-navy">
              <HeartLogo />
              <div>
                <p className="font-serif text-[22px] font-semibold leading-none tracking-wide transition-colors group-hover:text-pink">
                  CalAda <span className="text-pink">&amp;</span> Co
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-navy/45">
                  For Families, For Good
                </p>
              </div>
            </Link>

            <ul className="flex items-center gap-2">
              {NAV_ORDER.map((key) => {
                const menu = NAV_MENUS[key];
                const isOpen = activeKey === key;
                const isCurrent = location.pathname === menu.to || location.pathname.startsWith(menu.to);

                return (
                  <li key={key}>
                    <button
                      type="button"
                      onPointerEnter={() => setActiveKey(key)}
                      onFocus={() => setActiveKey(key)}
                      onClick={() => setActiveKey(isOpen ? null : key)}
                      className={`relative px-4 py-3 text-[13px] font-black uppercase tracking-[0.08em] transition-colors ${
                        isOpen || isCurrent ? 'text-navy' : 'text-navy/70 hover:text-navy'
                      }`}
                    >
                      {key === 'bundles' ? 'Bundles (up to 30% off)' : menu.label}
                      <motion.span
                        className="absolute bottom-1 left-4 right-4 h-[2px] origin-left bg-black"
                        initial={false}
                        animate={{ scaleX: isOpen || isCurrent ? 1 : 0 }}
                        transition={{ duration: 0.22 }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-2 text-black">
              <Link to="/shop" className="p-2.5 transition-colors hover:text-pink" aria-label="Search">
                <SearchIcon />
              </Link>
              <Link
                to={isLoggedIn ? '/account' : '/account/login'}
                className="p-2.5 transition-colors hover:text-pink"
                aria-label="Account"
              >
                <AccountIcon />
              </Link>
              <button
                className="relative p-2.5 transition-colors hover:text-pink"
                onClick={openCart}
                aria-label="Cart"
              >
                <CartIcon />
                {itemCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-pink text-[9px] font-bold leading-none text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex h-[72px] items-center justify-between md:hidden">
            <button
              className="p-2 text-navy"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-2 text-navy">
              <HeartLogo />
              <span className="font-serif text-[18px] font-semibold">
                CalAda <span className="text-pink">&amp;</span> Co
              </span>
            </Link>

            <button className="relative p-2 text-black" onClick={openCart} aria-label="Cart">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-pink text-[9px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeMenu && (
            <MegaMenu
              key={activeKey}
              menu={activeMenu}
              onClose={() => setActiveKey(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden border-t border-black/10 bg-white md:hidden"
            >
              <div className="px-5 py-4">
                {NAV_ORDER.map((key) => {
                  const menu = NAV_MENUS[key];
                  const open = mobileKey === key;

                  return (
                    <div key={key} className="border-b border-black/10 last:border-b-0">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left text-[13px] font-black uppercase tracking-[0.1em] text-navy"
                        onClick={() => setMobileKey(open ? null : key)}
                      >
                        <span>{key === 'bundles' ? 'Bundles (up to 30% off)' : menu.label}</span>
                        <motion.span animate={{ rotate: open ? 180 : 0 }}>
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                          </svg>
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-3 pb-4">
                              {menu.cards.map((card) => (
                                <Link
                                  key={card.title}
                                  to={card.to}
                                  className="relative flex min-h-[130px] items-end overflow-hidden rounded-[8px] bg-gray-100 p-4"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                  <span className="relative text-[15px] font-black uppercase tracking-[0.06em] text-white">
                                    {card.title}
                                  </span>
                                </Link>
                              ))}
                              <Link
                                to={menu.to}
                                className="py-2 text-[12px] font-bold uppercase tracking-[0.16em] text-pink"
                                onClick={() => setMenuOpen(false)}
                              >
                                Shop this edit
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer />
    </>
  );
}
