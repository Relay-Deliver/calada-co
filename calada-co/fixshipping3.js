const fs = require('fs');
let c = fs.readFileSync('src/pages/ShippingPage.jsx', 'utf8');

c = c.replace(
  `          <div className="rounded-2xl bg-navy p-7 sm:p-9 text-center">`,
  `          <section className="rounded-2xl border border-[#eeeeee] p-7 sm:p-9">
            <h2 className="font-serif text-xl font-semibold text-navy mb-5">Order Cancellation</h2>
            <div className="space-y-3 text-sm text-slate-600 leading-7">
              <p>We understand that plans change. If you need to cancel your order, please contact us as soon as possible at <a href="mailto:support@caladaco.com" className="text-[#c084a0] font-medium hover:underline">support@caladaco.com</a>.</p>
              <p>Orders cancelled within <strong className="text-navy">24 hours</strong> of placement are eligible for a full refund to your original payment method.</p>
              <p>Orders cancelled after 24 hours cannot be refunded as production may have already begun on your custom garment. We appreciate your understanding as each piece is made specifically for you.</p>
            </div>
          </section>

          <div className="rounded-2xl bg-navy p-7 sm:p-9 text-center">`
);

fs.writeFileSync('src/pages/ShippingPage.jsx', c, 'utf8');
console.log('done:', c.includes('Order Cancellation'));
