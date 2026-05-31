const PAYMENT_METHODS = ['Shop Pay', 'Apple Pay', 'PayPal', 'Visa', 'Mastercard', 'AmEx'];

export default function PaymentMethods({ className = '' }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
        Secure checkout accepts
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {PAYMENT_METHODS.map(method => (
          <span
            key={method}
            className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold leading-none text-slate-600"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}
