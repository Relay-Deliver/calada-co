const fs = require('fs');
const content = `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import AnnouncementBar from './components/layout/AnnouncementBar';
import CountdownBanner from './components/layout/CountdownBanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ShippingPage from './pages/ShippingPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AccountLoginPage from './pages/AccountLoginPage';
import AccountRegisterPage from './pages/AccountRegisterPage';
import AccountDashboardPage from './pages/AccountDashboardPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <CountdownBanner />
            <Navbar />
            <main>
              <Routes>
                <Route path="/"                     element={<HomePage />} />
                <Route path="/shop"                 element={<ShopPage />} />
                <Route path="/cart"                 element={<CartPage />} />
                <Route path="/collections/:handle"  element={<ShopPage />} />
                <Route path="/products/:handle"     element={<ProductPage />} />
                <Route path="/about"                element={<AboutPage />} />
                <Route path="/contact"              element={<ContactPage />} />
                <Route path="/shipping"             element={<ShippingPage />} />
                <Route path="/privacy"              element={<PrivacyPage />} />
                <Route path="/terms"                element={<TermsPage />} />
                <Route path="/account"              element={<AccountDashboardPage />} />
                <Route path="/account/login"        element={<AccountLoginPage />} />
                <Route path="/account/register"     element={<AccountRegisterPage />} />
                <Route path="/account/wishlist"     element={<WishlistPage />} />
              </Routes>
            </main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}`;
fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('done');
