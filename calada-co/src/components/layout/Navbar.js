import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartDrawer from '../cart/CartDrawer';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'New Arrivals', to: '/collections/new-arrivals' },
  { label: 'Women',        to: '/collections/women' },
  { label: 'Children',     to: '/collections/children' },
  { label: 'Family Sets',  to: '/collections/family-sets' },
  { label: 'Sale',         to: '/collections/sale' },
];

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          {/* Mobile menu toggle */}
          <button className="menu-toggle hide-desktop" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`hamburger ${menuOpen ? 'open' : ''}`} />
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            CalAda <span>&amp;</span> Co
          </Link>

          {/* Desktop nav */}
          <ul className="nav-links hide-mobile">
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="nav-icons">
            <Link to="/shop" className="nav-icon-btn" aria-label="Search">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>
            <Link to={isLoggedIn ? '/account' : '/account/login'} className="nav-icon-btn" aria-label="Account">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <button className="nav-icon-btn cart-btn" onClick={openCart} aria-label="Cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      <CartDrawer />
    </>
  );
}
