export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'When you place an order or create an account, we collect your name, email address, shipping address, phone number, and payment information. Payment data is processed securely through Shopify and is never stored on our servers. We may also collect browsing data such as pages visited, time on site, and device type to help us improve your experience.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use your information to process orders, send shipping confirmations, respond to inquiries, and with your consent send promotional emails. We do not sell or rent your personal data to third parties.'
    },
    {
      title: 'Cookies',
      content: 'We use cookies to keep your cart active, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings, though some features may not function correctly.'
    },
    {
      title: 'Third-Party Services',
      content: 'We use Shopify for payments, Klaviyo for email marketing, and Netlify for hosting. These services have their own privacy policies and handle data in accordance with applicable laws.'
    },
    {
      title: 'Your Rights',
      content: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us at support@caladaco.com. You may also unsubscribe from marketing emails at any time using the link in any email we send.'
    },
    {
      title: 'Contact Us',
      content: 'Questions about this policy? Reach out at support@caladaco.com and we will respond within 1-2 business days.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-navy py-16 px-5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c084a0] mb-3">Legal</p>
        <h1 className="font-serif text-[36px] font-semibold text-white mb-2">Privacy Policy</h1>
        <p className="text-base text-[#B5C8E8]">Last updated June 2026</p>
      </div>
      <div className="max-w-[860px] mx-auto px-5 py-16">
        <div className="space-y-4">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl border border-[#eeeeee] p-7 sm:p-9">
              <h2 className="font-serif text-lg font-semibold text-navy mb-4">{s.title}</h2>
              <p className="text-sm text-slate-600 leading-7">
                {s.content.includes('support@caladaco.com') ? (
                  s.content.split('support@caladaco.com').map((part, j, arr) => (
                    <span key={j}>{part}{j < arr.length - 1 && <a href="mailto:support@caladaco.com" className="text-[#c084a0] font-medium hover:underline">support@caladaco.com</a>}</span>
                  ))
                ) : s.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}