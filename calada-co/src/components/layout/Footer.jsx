import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy text-navy-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-white text-lg font-medium mb-3">
              CalAda <span className="text-pink-mid">&amp; Co</span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Boutique apparel for mothers, families &amp; children. Made with love.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-pink-mid text-xs font-medium tracking-widest uppercase mb-4">shop</h4>
            {[
              { label: 'new arrivals', to: '/collections/new-arrivals' },
              { label: 'women', to: '/collections/women' },
              { label: 'children', to: '/collections/children' },
              { label: 'family sets', to: '/collections/family-sets' },
              { label: 'sale', to: '/collections/sale' },
            ].map(l => (
              <Link key={l.to} to={l.to} className="block text-sm text-blue-200 hover:text-white mb-2 transition-colors">{l.label}</Link>
            ))}
          </div>

          {/* Help */}
          <div>
            <h4 className="text-pink-mid text-xs font-medium tracking-widest uppercase mb-4">help</h4>
            {[
              { label: 'faq', to: '/faq' },
              { label: 'contact us', to: '/contact' },
              { label: 'size guide', to: '/faq#sizing' },
              { label: 'returns', to: '/faq#returns' },
              { label: 'track order', to: '/account' },
            ].map(l => (
              <Link key={l.to} to={l.to} className="block text-sm text-blue-200 hover:text-white mb-2 transition-colors">{l.label}</Link>
            ))}
          </div>

          {/* About */}
          <div>
            <h4 className="text-pink-mid text-xs font-medium tracking-widest uppercase mb-4">about</h4>
            {[
              { label: 'our story', to: '/about' },
              { label: 'ambassadors', to: '/about#ambassadors' },
            ].map(l => (
              <Link key={l.to} to={l.to} className="block text-sm text-blue-200 hover:text-white mb-2 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Email signup */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md">
            <p className="text-white font-medium mb-1">join the CalAda family</p>
            <p className="text-sm text-blue-200 mb-4">get 20% off your first order + early access to new arrivals</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder-blue-300 focus:outline-none focus:border-pink-mid"
              />
              <button className="bg-pink hover:bg-pink-dark text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                sign up
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-300">© 2026 CalAda &amp; Co. all rights reserved.</p>
          <div className="flex gap-4 text-xs text-blue-300">
            <Link to="/faq#privacy" className="hover:text-white transition-colors">privacy policy</Link>
            <Link to="/faq#terms" className="hover:text-white transition-colors">terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
