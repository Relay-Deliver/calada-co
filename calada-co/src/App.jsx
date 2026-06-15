import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import AnnouncementBar from './components/layout/AnnouncementBar';
import CountdownBanner from './components/layout/CountdownBanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Preloader from './components/layout/Preloader';
import LaunchGate from './components/LaunchGate';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import BundlesPage from './pages/BundlesPage';
import BundleBuilderPage from './pages/BundleBuilderPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ShippingPage from './pages/ShippingPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AccountLoginPage from './pages/AccountLoginPage';
import AccountRegisterPage from './pages/AccountRegisterPage';
import AccountDashboardPage from './pages/AccountDashboardPage';
import WishlistPage from './pages/WishlistPage';

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(hash.slice(1));
        if (target) target.scrollIntoView({ block: 'start' });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [hash, pathname, search]);

  return null;
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    let active = true;
    let loadHandler;

    const minimumDisplay = new Promise(resolve => {
      window.setTimeout(resolve, 850);
    });
    const pageLoaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise(resolve => {
          loadHandler = resolve;
          window.addEventListener('load', loadHandler, { once: true });
        });

    Promise.all([minimumDisplay, pageLoaded]).then(() => {
      if (active) setShowPreloader(false);
    });

    return () => {
      active = false;
      if (loadHandler) window.removeEventListener('load', loadHandler);
    };
  }, []);

  return (
    <BrowserRouter>
      <Preloader visible={showPreloader} />
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>

            {/* LaunchGate blurs the entire layout until user clicks Let's Go.
                ready={!showPreloader} ensures it only appears after the preloader finishes. */}
            <LaunchGate ready={!showPreloader}>
              <AnnouncementBar />
              <CountdownBanner />
              <Navbar />
              <main>
                <Routes>
                  <Route path="/"                     element={<HomePage />} />
                  <Route path="/shop"                 element={<ShopPage />} />
                  <Route path="/cart"                 element={<CartPage />} />
                  <Route path="/collections"          element={<ShopPage />} />
                  <Route path="/collections/:handle"  element={<ShopPage />} />
                  <Route path="/products/:handle"     element={<ProductPage />} />
                  <Route path="/bundles"              element={<BundlesPage />} />
                  <Route path="/bundles/:handle"      element={<BundleBuilderPage />} />
                  <Route path="/about"                element={<AboutPage />} />
                  <Route path="/contact"              element={<ContactPage />} />
                  <Route path="/shipping"             element={<ShippingPage />} />
                  <Route path="/privacy"              element={<PrivacyPage />} />
                  <Route path="/terms"                element={<TermsPage />} />
                  <Route path="/account"              element={<AccountDashboardPage />} />
                  <Route path="/account/login"        element={<AccountLoginPage />} />
                  <Route path="/account/register"     element={<AccountRegisterPage />} />
                  <Route path="/account/wishlist"     element={<WishlistPage />} />
                  <Route path="*"                     element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </LaunchGate>

          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}