import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-[60px] pb-20">
      <div className="max-w-[1280px] mx-auto px-5">
        <h1 className="text-[32px] font-bold text-navy mb-2">Contact Us</h1>
        <p className="text-[15px] text-[#888888] mb-12">We would love to hear from you. We typically respond within 24 hours.</p>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-[60px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy">Email</p>
              <a href="mailto:support@caladaco.com" className="text-sm text-[#c084a0] hover:underline">support@caladaco.com</a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy">Hours</p>
              <p className="text-sm text-[#555555]">Mon - Fri, 9am - 5pm EST</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy">Processing</p>
              <p className="text-sm text-[#555555]">Orders ready in 3 - 5 business days</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy">Follow Us</p>
              <a href="https://instagram.com/calada.co" target="_blank" rel="noreferrer" className="text-sm text-[#c084a0] hover:underline">@calada.co</a>
            </div>
          </div>
          {sent ? (
            <div className="text-center py-[60px] px-5">
              <h3 className="text-[22px] font-semibold text-navy mb-2">Message sent!</h3>
              <p className="text-[#888888]">Thanks for reaching out. We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#333333]">Name</label>
                <input
                  className="px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#333333]">Email</label>
                <input
                  className="px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#333333]">Message</label>
                <textarea
                  className="px-3.5 py-2.5 border-[1.5px] border-[#eeeeee] rounded-[6px] text-sm outline-none transition-colors focus:border-pink"
                  rows={5}
                  required
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                />
              </div>
              <button
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-pink text-white hover:bg-pink-dark"
                type="submit"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}