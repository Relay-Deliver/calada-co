export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-navy py-16 px-5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#c084a0] mb-3">Policies</p>
        <h1 className="font-serif text-[36px] font-semibold text-white mb-2">Shipping &amp; Returns</h1>
        <p className="text-base text-[#B5C8E8]">Everything you need to know about getting your order.</p>
      </div>

      <div className="max-w-[860px] mx-auto px-5 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          <div className="rounded-2xl bg-[#fdf4f7] border border-[#f0d6e4] p-6 text-center">
            <p className="text-2xl font-bold text-navy mb-1">Free</p>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#c084a0]">Shipping over $65</p>
          </div>
          <div className="rounded-2xl bg-[#fdf4f7] border border-[#f0d6e4] p-6 text-center">
            <p className="text-2xl font-bold text-navy mb-1">14 Days</p>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#c084a0]">Easy returns</p>
          </div>
          <div className="rounded-2xl bg-[#fdf4f7] border border-[#f0d6e4] p-6 text-center">
            <p className="text-2xl font-bold text-navy mb-1">3-5 Days</p>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#c084a0]">Processing time</p>
          </div>
        </div>

        <div className="space-y-10">
          <section className="rounded-2xl border border-[#eeeeee] p-7 sm:p-9">
            <h2 className="font-serif text-xl font-semibold text-navy mb-5">Shipping Policy</h2>
            <div className="space-y-3 text-sm text-slate-600 leading-7">
              <p>Orders are processed within 3-5 business days. You will receive a confirmation email with tracking once your order ships.</p>
              <p>Standard shipping takes 5-7 business days. Expedited shipping (2-3 business days) is available at checkout.</p>
              <p>Free standard shipping is available on all orders over $65.</p>
              <p>We currently ship within the United States. International shipping is not available at this time.</p>
              <p>CalAda &amp; Co. is not responsible for delays caused by carriers, weather, or incorrect addresses. Please double-check your shipping address before placing your order.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#eeeeee] p-7 sm:p-9">
            <h2 className="font-serif text-xl font-semibold text-navy mb-5">Return Policy</h2>
            <div className="space-y-3 text-sm text-slate-600 leading-7">
              <p>We accept returns within 14 days of delivery for items that are unworn, unwashed, and in their original condition with tags attached.</p>
              <p>To start a return, email us at <a href="mailto:support@caladaco.com" className="text-[#c084a0] font-medium hover:underline">support@caladaco.com</a> with your order number and reason for return.</p>
              <p>Sale items, custom orders, and intimates are final sale and not eligible for return.</p>
              <p>Original shipping charges are non-refundable. Return shipping costs are the responsibility of the customer unless the item arrived damaged or defective.</p>
              <p>Once your return is received and inspected, a refund will be issued to your original payment method within 5-7 business days.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#eeeeee] p-7 sm:p-9">
            <h2 className="font-serif text-xl font-semibold text-navy mb-5">Damaged or Defective Items</h2>
            <div className="space-y-3 text-sm text-slate-600 leading-7">
              <p>If your item arrives damaged or defective, please contact us within 7 days of delivery at <a href="mailto:support@caladaco.com" className="text-[#c084a0] font-medium hover:underline">support@caladaco.com</a> with photos of the damage.</p>
              <p>We will arrange a replacement or full refund at no cost to you.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#eeeeee] p-7 sm:p-9">
            <h2 className="font-serif text-xl font-semibold text-navy mb-5">Order Cancellation</h2>
            <div className="space-y-3 text-sm text-slate-600 leading-7">
              <p>We understand that plans change. If you need to cancel your order, please contact us as soon as possible at <a href="mailto:support@caladaco.com" className="text-[#c084a0] font-medium hover:underline">support@caladaco.com</a>.</p>
              <p>Orders cancelled within <strong className="text-navy">24 hours</strong> of placement are eligible for a full refund to your original payment method.</p>
              <p>Orders cancelled after 24 hours cannot be refunded as production may have already begun on your custom garment. We appreciate your understanding as each piece is made specifically for you.</p>
            </div>
          </section>

          <div className="rounded-2xl bg-navy p-7 sm:p-9 text-center">
            <p className="font-serif text-xl font-semibold text-white mb-2">Still have questions?</p>
            <p className="text-sm text-white/60 mb-4">Our team is happy to help with anything shipping or returns related.</p>
            <a href="mailto:support@caladaco.com" className="inline-flex items-center justify-center py-3 px-7 rounded-full text-sm font-bold text-navy bg-white hover:bg-[#fdf4f7] transition-colors">
              support@caladaco.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}