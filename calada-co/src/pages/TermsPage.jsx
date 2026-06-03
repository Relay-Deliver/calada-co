export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing or using caladaco.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site.'
    },
    {
      title: 'Products and Orders',
      content: 'All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice. We reserve the right to refuse or cancel any order at our discretion.'
    },
    {
      title: 'Payment',
      content: 'We accept all major credit cards and payment methods available through Shopify Payments. By placing an order, you represent that you are authorized to use the payment method provided.'
    },
    {
      title: 'Intellectual Property',
      content: 'All content on this site including images, text, logos, and graphics is the property of CalAda & Co. and may not be reproduced without written permission.'
    },
    {
      title: 'Limitation of Liability',
      content: 'CalAda & Co. is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the purchase price of the item in question.'
    },
    {
      title: 'Governing Law',
      content: 'These terms are governed by the laws of the State of Michigan. Any disputes shall be resolved in the courts of Michigan.'
    },
    {
      title: 'Contact',
      content: 'Questions about these terms? Email us at support@caladaco.com and we will respond within 1-2 business days.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-navy py-16 px-5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c084a0] mb-3">Legal</p>
        <h1 className="font-serif text-[36px] font-semibold text-white mb-2">Terms of Service</h1>
        <p className="text-base text-[#B5C8E8]">Last updated June 2026</p>
      </div>
      <div className="max-w-[860px] mx-auto px-5 py-16">
        <div className="space-y-4">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl border border-[#eeeeee] p-7 sm:p-9">
              <div className="flex items-start gap-4">
                <span className="font-serif text-3xl font-semibold text-[#c084a0]/30 leading-none mt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-navy mb-3">{s.title}</h2>
                  <p className="text-sm text-slate-600 leading-7">
                    {s.content.includes('support@caladaco.com') ? (
                      s.content.split('support@caladaco.com').map((part, j, arr) => (
                        <span key={j}>{part}{j < arr.length - 1 && <a href="mailto:support@caladaco.com" className="text-[#c084a0] font-medium hover:underline">support@caladaco.com</a>}</span>
                      ))
                    ) : s.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}