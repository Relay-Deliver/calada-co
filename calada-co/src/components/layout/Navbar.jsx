import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { label: 'new arrivals', to: '/collections/new-arrivals' },
  { label: 'women', to: '/collections/women' },
  { label: 'children', to: '/collections/children' },
  { label: 'family sets', to: '/collections/family-sets' },
  { label: 'sale', to: '/collections/sale' },
]

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart()
  const { customer } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-medium text-navy tracking-wide">
          CalAda <span className="text-pink">&amp; Co</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${isActive ? 'text-pink font-medium' : 'text-navy hover:text-pink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to="/shop" className="text-navy hover:text-pink transition-colors" aria-label="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </Link>

          <Link
            to={customer ? '/account' : '/account/login'}
            className="text-navy hover:text-pink transition-colors"
            aria-label="Account"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="relative text-navy hover:text-pink transition-colors"
            aria-label="Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-navy"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-navy hover:text-pink transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
