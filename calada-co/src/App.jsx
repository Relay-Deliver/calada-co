import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AccountLoginPage from './pages/AccountLoginPage';
import AccountRegisterPage from './pages/AccountRegisterPage';
import AccountDashboardPage from './pages/AccountDashboardPage';
import CountdownBanner from './components/layout/CountdownBanner';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AnnouncementBar />
          <CountdownBanner />
          <Navbar />
          <main>
            <Routes>
              <Route path="/"                    element={<HomePage />} />
              <Route path="/shop"                element={<ShopPage />} />
              <Route path="/collections/:handle" element={<ShopPage />} />
              <Route path="/products/:handle"    element={<ProductPage />} />
              <Route path="/about"               element={<AboutPage />} />
              <Route path="/contact"             element={<ContactPage />} />
              <Route path="/account"             element={<AccountDashboardPage />} />
              <Route path="/account/login"       element={<AccountLoginPage />} />
              <Route path="/account/register"    element={<AccountRegisterPage />} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
