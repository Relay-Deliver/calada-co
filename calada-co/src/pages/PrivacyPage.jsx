export default function PrivacyPage() {
  return (
    <div>
      <div className="bg-navy py-16 px-5 text-center">
        <h1 className="text-[36px] font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-base text-[#B5C8E8]">Last updated June 2026</p>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-16 space-y-8 text-sm text-slate-600 leading-7">

        <section>
          <h2 className="text-lg font-bold text-navy mb-3">Information We Collect</h2>
          <p>When you place an order or create an account, we collect your name, email address, shipping address, phone number, and payment information. Payment data is processed securely through Shopify and is never stored on our servers.</p>
          <p className="mt-2">We may also collect browsing data such as pages visited, time on site, and device type to help us improve your experience.</p>
        </section>

        <div className="border-t border-[#eeeeee]" />

        <section>
          <h2 className="text-lg font-bold text-navy mb-3">How We Use Your Information</h2>
          <p>We use your information to process orders, send shipping confirmations, respond to inquiries, and with your consent send promotional emails. We do not sell or rent your personal data to third parties.</p>
        </section>

        <div className="border-t border-[#eeeeee]" />

        <section>
          <h2 className="text-lg font-bold text-navy mb-3">Cookies</h2>
          <p>We use cookies to keep your cart active, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings, though some features may not function correctly.</p>
        </section>

        <div className="border-t border-[#eeeeee]" />

        <section>
          <h2 className="text-lg font-bold text-navy mb-3">Third-Party Services</h2>
          <p>We use Shopify for payments, Klaviyo for email marketing, and Netlify for hosting. These services have their own privacy policies and handle data in accordance with applicable laws.</p>
        </section>

        <div className="border-t border-[#eeeeee]" />

        <section>
          <h2 className="text-lg font-bold text-navy mb-3">Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:hello@caladaco.com" className="text-[#c084a0] font-medium">hello@caladaco.com</a>. You may also unsubscribe from marketing emails at any time using the link in any email we send.</p>
        </section>

        <div className="border-t border-[#eeeeee]" />

        <section>
          <h2 className="text-lg font-bold text-navy mb-3">Contact Us</h2>
          <p>Questions about this policy? Reach out at <a href="mailto:hello@caladaco.com" className="text-[#c084a0] font-medium">hello@caladaco.com</a>.</p>
        </section>

      </div>
    </div>
  );
}