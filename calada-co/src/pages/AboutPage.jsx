import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div>
      <div className="bg-navy py-20 px-5 text-center">
        <div className="max-w-[1280px] mx-auto px-5">
          <h1 className="text-[40px] font-bold text-white mb-2.5">Our Story</h1>
          <p className="text-base text-[#B5C8E8]">A boutique born from love, built for families.</p>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 pt-16 pb-20">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-navy mb-4">Meet Meagan</h2>
          <p className="text-[15px] text-[#333333] leading-[1.8] mb-3">CalAda & Co was born from a simple idea — that mothers and families deserve beautiful, thoughtfully made clothing that feels as special as the moments they're worn in.</p>
          <p className="text-[15px] text-[#333333] leading-[1.8] mb-3">Every piece in our collection is made to order, crafted with care, and designed to become a favorite in your wardrobe for years to come.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center py-7 px-5 bg-[#f7f7f7] rounded-2xl">
            <span className="text-[32px] block mb-3">🧵</span>
            <h3 className="text-base font-semibold text-navy mb-2">Made to Order</h3>
            <p className="text-[13px] text-[#888888] leading-[1.6]">Nothing sits in a warehouse. Every item is made specifically for you after you order.</p>
          </div>
          <div className="text-center py-7 px-5 bg-[#f7f7f7] rounded-2xl">
            <span className="text-[32px] block mb-3">💕</span>
            <h3 className="text-base font-semibold text-navy mb-2">Family First</h3>
            <p className="text-[13px] text-[#888888] leading-[1.6]">Matching sets, mommy & me styles, and pieces the whole family will love.</p>
          </div>
          <div className="text-center py-7 px-5 bg-[#f7f7f7] rounded-2xl">
            <span className="text-[32px] block mb-3">🌸</span>
            <h3 className="text-base font-semibold text-navy mb-2">Quality Always</h3>
            <p className="text-[13px] text-[#888888] leading-[1.6]">We source only the best fabrics and partner with trusted suppliers to ensure every piece is worth it.</p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-pink text-white hover:bg-pink-dark"
          >
            Shop the Collection
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-transparent text-navy border-[1.5px] border-navy hover:bg-navy hover:text-white"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
