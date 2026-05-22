import { Link } from 'react-router-dom';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p>A boutique born from love, built for families.</p>
        </div>
      </div>
      <div className="container about-content">
        <div className="about-section">
          <h2>Meet Meagan</h2>
          <p>CalAda & Co was born from a simple idea — that mothers and families deserve beautiful, thoughtfully made clothing that feels as special as the moments they're worn in.</p>
          <p>Every piece in our collection is made to order, crafted with care, and designed to become a favorite in your wardrobe for years to come.</p>
        </div>
        <div className="about-values">
          <div className="about-value">
            <span>🧵</span>
            <h3>Made to Order</h3>
            <p>Nothing sits in a warehouse. Every item is made specifically for you after you order.</p>
          </div>
          <div className="about-value">
            <span>💕</span>
            <h3>Family First</h3>
            <p>Matching sets, mommy & me styles, and pieces the whole family will love.</p>
          </div>
          <div className="about-value">
            <span>🌸</span>
            <h3>Quality Always</h3>
            <p>We source only the best fabrics and partner with trusted suppliers to ensure every piece is worth it.</p>
          </div>
        </div>
        <div className="about-cta">
          <Link to="/shop" className="btn btn-primary">Shop the Collection</Link>
          <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
}
