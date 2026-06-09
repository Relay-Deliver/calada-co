import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'How long does it take to get my products?',
    a: 'Orders are processed within 3-5 business days. Standard shipping takes an additional 5-7 business days. Expedited options are available at checkout.',
  },
  {
    q: 'Do you offer returns or refunds?',
    a: 'We accept returns within 14 days of delivery for unworn, unwashed items in original condition with tags attached. Sale items and custom orders are final sale. Email support@caladaco.com to start a return.',
  },
  {
    q: 'What shipping methods do you offer?',
    a: 'Standard shipping (5-7 business days) and expedited shipping (2-3 business days) are available at checkout. Free standard shipping on all orders over $65.',
  },
  {
    q: 'Do you offer warranty for your products?',
    a: 'All products are subject to quality control. Our warranty covers manufacturer defects — please notify us within 30 days of receiving your order. It does not cover shipping damage, improper use, or normal wear.',
  },
  {
    q: 'Do you work with influencers?',
    a: 'Yes! We love partnering with families and creators who align with our values. Reach out at support@caladaco.com with your social handle and we will be in touch.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be modified or cancelled within 24 hours of placement. After that, production may have already begun. Please contact us immediately at support@caladaco.com.',
  },
];

const GALLERY = [
  { src: '/assets/family-photo.png', alt: 'Meagan and family' },
  { src: '/assets/adalynn.png', alt: 'Adalynn' },
  { src: '/assets/adalynn-2.png', alt: 'Adalynn' },
  { src: '/assets/calvin.png', alt: 'Calvin' },
  { src: '/assets/calvin-2.png', alt: 'Calvin' },
  { src: '/assets/family-2.png', alt: 'CalAda family moment' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#eeeeee]">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-navy hover:text-[#c084a0] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span>{q}</span>
        <span className="ml-4 shrink-0 text-lg leading-none text-[#c084a0]">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="pb-4 text-sm leading-7 text-slate-500">{a}</p>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <div className="relative bg-navy py-24 sm:py-36 px-5 text-center overflow-hidden">
        <img
          src="/assets/megan-kohn.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy/80 pointer-events-none" />
        <div className="relative max-w-[1280px] mx-auto">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-pink-mid mb-4">Est. Michigan</p>
          <h1 className="font-serif text-5xl sm:text-[72px] font-bold text-white mb-5 leading-tight">Our Story</h1>
          <p className="text-base sm:text-lg text-[#B5C8E8] max-w-md mx-auto">A small town momma with big ideas.</p>
        </div>
      </div>

      {/* PINK MISSION RIBBON */}
      <div className="bg-pink py-4 px-5">
        <p className="text-center text-white text-sm font-medium tracking-wide max-w-2xl mx-auto">
          Dedicated to creating stylish, quality apparel that inspires confidence, individuality, and everyday self-expression.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 py-16 sm:py-20">

        {/* MEET MEAGAN — two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-pink mb-3">The Founder</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-6">Meet Megan</h2>
            <p className="text-[15px] text-[#333333] leading-[1.9] mb-4">
              CalAda &amp; Co. was born from a simple idea — that mothers and families deserve beautifully made clothing that feels as special as the moments they are worn in.
            </p>
            <p className="text-[15px] text-[#333333] leading-[1.9] mb-4">
              A mother of two, Megan named this brand after her children — Calvin and Adalynn — and built it from the ground up right here in small-town Michigan. What started as a simple idea grew into a full clothing line rooted in family, faith, and everyday style.
            </p>
            <p className="text-[15px] text-[#333333] leading-[1.9]">
              Every piece in our collection is crafted with care and designed to become a favorite in your wardrobe for years to come. Because around here, we believe families deserve to look and feel their best — without the big price tag.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/5' }}>
            <img
              src="/assets/megan-kohn.png"
              alt="Meagan and family"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* VALUES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
          <div className="text-center py-9 px-6 bg-[#fdf4f7] border border-pink-light rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-light mx-auto mb-4">
              <svg width="24" height="24" fill="none" stroke="#D4537E" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-navy mb-2">Made with Care</h3>
            <p className="text-[13px] text-[#888888] leading-[1.7]">Every item is thoughtfully sourced and crafted to the standard you deserve.</p>
          </div>
          <div className="text-center py-9 px-6 bg-[#fdf4f7] border border-pink-light rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-light mx-auto mb-4">
              <svg width="24" height="24" fill="none" stroke="#D4537E" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-navy mb-2">Family First</h3>
            <p className="text-[13px] text-[#888888] leading-[1.7]">Matching sets, mommy &amp; me styles, and pieces the whole family will love.</p>
          </div>
          <div className="text-center py-9 px-6 bg-[#fdf4f7] border border-pink-light rounded-2xl">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-light mx-auto mb-4">
              <svg width="24" height="24" fill="none" stroke="#D4537E" strokeWidth="1.8" viewBox="0 0 24 24">
                <polyline points="9 11 12 14 22 4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-navy mb-2">Quality Always</h3>
            <p className="text-[13px] text-[#888888] leading-[1.7]">We partner with trusted suppliers to ensure every piece is worth every penny.</p>
          </div>
        </div>

        {/* PHOTO GALLERY — pink background */}
        <div className="rounded-3xl bg-[#fdf4f7] px-6 py-10 sm:px-10 sm:py-12 mb-20">
          <div className="text-center mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-pink mb-2">Life at CalAda &amp; Co.</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">Made for Moments</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GALLERY.map(img => (
              <div key={img.src} className="rounded-xl overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="mb-16 scroll-mt-36">
          <h2 className="font-serif text-2xl font-bold text-navy mb-1">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400 mb-6">Everything you need to know before you shop.</p>
          {FAQS.map(faq => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* CTA BANNER */}
        <div className="rounded-2xl bg-navy px-8 py-10 sm:py-12 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">Ready to shop?</h3>
          <p className="text-[#B5C8E8] text-sm mb-7 max-w-sm mx-auto">Explore our full collection of family-first styles made with love.</p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center py-3 px-7 rounded-full text-sm font-bold whitespace-nowrap transition-colors bg-pink text-white hover:bg-pink-dark"
            >
              Shop the Collection
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center py-3 px-7 rounded-full text-sm font-bold whitespace-nowrap transition-colors bg-transparent text-white border border-white/30 hover:bg-white/10"
            >
              Get in Touch
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
