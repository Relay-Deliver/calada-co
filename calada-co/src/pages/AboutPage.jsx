import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'How long does it take to get my products?',
    a: 'Orders are processed within 3-5 business days. Standard shipping takes an additional 5-7 business days. Expedited options are available at checkout.',
  },
  {
    q: 'Do you offer returns or refunds?',
    a: 'We accept returns within 14 days of delivery for unworn, unwashed items in original condition with tags attached. Sale items and custom orders are final sale. Email hello@caladaco.com to start a return.',
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
    a: 'Yes! We love partnering with families and creators who align with our values. Reach out at hello@caladaco.com with your social handle and we will be in touch.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be modified or cancelled within 24 hours of placement. After that, production may have already begun. Please contact us immediately at hello@caladaco.com.',
  },
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
      <div className="bg-navy py-20 px-5 text-center">
        <div className="max-w-[1280px] mx-auto px-5">
          <h1 className="text-[40px] font-bold text-white mb-2.5">Our Story</h1>
          <p className="text-base text-[#B5C8E8]">A small town momma with big ideas.</p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-5 pt-16 pb-20">

        {/* Mission */}
        <div className="mb-12 rounded-2xl bg-[#fdf4f7] border border-[#f0d6e4] px-8 py-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c084a0] mb-3">Our Mission</p>
          <p className="font-serif text-xl font-semibold text-navy leading-8">
            CalAda &amp; Co. is dedicated to creating stylish, quality apparel that inspires confidence, individuality, and everyday self-expression through accessible online fashion.
          </p>
        </div>

        {/* Meet Meagan */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-navy mb-4">Meet Meagan</h2>
          <p className="text-[15px] text-[#333333] leading-[1.8] mb-3">
            CalAda &amp; Co. was born from a simple idea — that mothers and families deserve beautifully made clothing that feels as special as the moments they are worn in.
          </p>
          <p className="text-[15px] text-[#333333] leading-[1.8] mb-3">
            A mother of two, Meagan named this brand after her children — Cal and Ada — and built it from the ground up right here in small-town Michigan. What started as a simple idea grew into a full clothing line rooted in family, faith, and everyday style.
          </p>
          <p className="text-[15px] text-[#333333] leading-[1.8] mb-3">
            Every piece in our collection is crafted with care and designed to become a favorite in your wardrobe for years to come. Because around here, we believe families deserve to look and feel their best — without the big price tag.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="text-center py-7 px-5 bg-[#f7f7f7] rounded-2xl">
            <h3 className="text-base font-semibold text-navy mb-2">Made with Care</h3>
            <p className="text-[13px] text-[#888888] leading-[1.6]">Every item is thoughtfully sourced and crafted to the standard you deserve.</p>
          </div>
          <div className="text-center py-7 px-5 bg-[#f7f7f7] rounded-2xl">
            <h3 className="text-base font-semibold text-navy mb-2">Family First</h3>
            <p className="text-[13px] text-[#888888] leading-[1.6]">Matching sets, mommy &amp; me styles, and pieces the whole family will love.</p>
          </div>
          <div className="text-center py-7 px-5 bg-[#f7f7f7] rounded-2xl">
            <h3 className="text-base font-semibold text-navy mb-2">Quality Always</h3>
            <p className="text-[13px] text-[#888888] leading-[1.6]">We partner with trusted suppliers to ensure every piece is worth every penny.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
          {FAQS.map(faq => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-3 flex-wrap">
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-pink text-white hover:bg-pink-dark">
            Shop the Collection
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-transparent text-navy border-[1.5px] border-navy hover:bg-navy hover:text-white">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}