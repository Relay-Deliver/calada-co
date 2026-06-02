export default function ShippingPage() {
  return (
    <div>
      <div className="bg-navy py-16 px-5 text-center">
        <h1 className="text-[36px] font-bold text-white mb-2">Shipping &amp; Returns</h1>
        <p className="text-base text-[#B5C8E8]">Everything you need to know about getting your order.</p>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-16 space-y-10">

        <section>
          <h2 className="text-xl font-bold text-navy mb-4">Shipping Policy</h2>
          <div className="space-y-3 text-sm text-slate-600 leading-7">
            <p>Orders are processed within 3-5 business days. You will receive a confirmation email with tracking once your order ships.</p>
            <p>Standard shipping takes 5-7 business days. Expedited shipping (2-3 business days) is available at checkout.</p>
            <p>Free standard shipping is available on all orders over $65.</p>
            <p>We currently ship within the United States. International shipping is not available at this time.</p>
            <p>CalAda &amp; Co. is not responsible for delays caused by carriers, weather, or incorrect addresses provided at checkout. Please double-check your shipping address before placing your order.</p>
          </div>
        </section>

        <div className="border-t border-[#eeeeee]" />

        <section>
          <h2 className="text-xl font-bold text-navy mb-4">Return Policy</h2>
          <div className="space-y-3 text-sm text-slate-600 leading-7">
            <p>We accept returns within 14 days of delivery for items that are unworn, unwashed, and in their original condition with tags attached.</p>
            <p>To start a return, email us at <a href="mailto:hello@caladaco.com" className="text-[#c084a0] font-medium">hello@caladaco.com</a> with your order number and reason for return.</p>
            <p>Sale items, custom orders, and intimates are final sale and not eligible for return.</p>
            <p>Original shipping charges are non-refundable. Return shipping costs are the responsibility of the customer unless the item arrived damaged or defective.</p>
            <p>Once your return is received and inspected, a refund will be issued to your original payment method within 5-7 business days.</p>
          </div>
        </section>

        <div className="border-t border-[#eeeeee]" />

        <section>
          <h2 className="text-xl font-bold text-navy mb-4">Damaged or Defective Items</h2>
          <div className="space-y-3 text-sm text-slate-600 leading-7">
            <p>If your item arrives damaged or defective, please contact us within 7 days of delivery at <a href="mailto:hello@caladaco.com" className="text-[#c084a0] font-medium">hello@caladaco.com</a> with photos of the damage.</p>
            <p>We will arrange a replacement or full refund at no cost to you.</p>
          </div>
        </section>

      </div>
    </div>
  );
}