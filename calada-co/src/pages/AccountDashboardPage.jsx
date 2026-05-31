import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../services/shopify';

export default function AccountDashboardPage() {
  const { customer, logout, loading, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) navigate('/account/login');
  }, [loading, isLoggedIn, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 border-2 border-[#FBEAF0] border-t-pink rounded-full animate-spin" />
      </div>
    );
  }
  if (!customer) return null;

  const orders = customer.orders?.edges?.map(e => e.node) || [];

  return (
    <div className="min-h-[70vh] flex items-start py-[60px] px-5">
      <div className="max-w-[1280px] mx-auto px-5 w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-navy">My Account</h1>
            <p className="text-sm text-[#888888] mt-1.5">Welcome back, {customer.firstName}! 👋</p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-transparent text-navy border-[1.5px] border-navy hover:bg-navy hover:text-white"
            onClick={() => { logout(); navigate('/'); }}
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
          <div className="bg-white rounded-2xl border border-[#eeeeee] p-6">
            <h3 className="text-base font-semibold text-navy mb-4">Account Details</h3>
            <p className="text-sm text-[#333333] leading-[1.6]">{customer.firstName} {customer.lastName}</p>
            <p className="text-sm text-[#333333] leading-[1.6]">{customer.email}</p>
            {customer.defaultAddress && (
              <div className="mt-3 pt-3 border-t border-[#eeeeee]">
                <p className="text-sm text-[#333333] leading-[1.6]">{customer.defaultAddress.address1}</p>
                {customer.defaultAddress.address2 && (
                  <p className="text-sm text-[#333333] leading-[1.6]">{customer.defaultAddress.address2}</p>
                )}
                <p className="text-sm text-[#333333] leading-[1.6]">
                  {customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#eeeeee] p-6">
            <h3 className="text-base font-semibold text-navy mb-4">Order History</h3>
            {orders.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-[#888888] mb-4">No orders yet.</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-pink text-white hover:bg-pink-dark"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="flex justify-between py-3.5 border-b border-[#eeeeee]">
                  <div>
                    <p className="text-sm font-semibold text-navy">Order #{order.orderNumber}</p>
                    <p className="text-xs text-[#888888] my-0.5">{new Date(order.processedAt).toLocaleDateString()}</p>
                    <p className="text-xs text-[#888888] max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {order.lineItems.edges.map(e => e.node.title).join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-pink">
                      {formatPrice(order.currentTotalPrice.amount, order.currentTotalPrice.currencyCode)}
                    </p>
                    <span className={`text-[11px] font-semibold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full ${
                      order.fulfillmentStatus.toLowerCase() === 'fulfilled'
                        ? 'bg-[#c6f6d5] text-[#276749]'
                        : 'bg-[#f7f7f7] text-[#888888]'
                    }`}>
                      {order.fulfillmentStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
