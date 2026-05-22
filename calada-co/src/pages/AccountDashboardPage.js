import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../services/shopify';
import './AccountPage.css';

export default function AccountDashboardPage() {
  const { customer, logout, loading, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) navigate('/account/login');
  }, [loading, isLoggedIn, navigate]);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!customer) return null;

  const orders = customer.orders?.edges?.map(e => e.node) || [];

  return (
    <div className="account-page account-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>My Account</h1>
            <p className="account-sub">Welcome back, {customer.firstName}! 👋</p>
          </div>
          <button className="btn btn-outline" onClick={() => { logout(); navigate('/'); }}>Sign Out</button>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Account Details</h3>
            <p>{customer.firstName} {customer.lastName}</p>
            <p>{customer.email}</p>
            {customer.defaultAddress && (
              <div className="address-block">
                <p>{customer.defaultAddress.address1}</p>
                {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                <p>{customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}</p>
              </div>
            )}
          </div>

          <div className="dashboard-card orders-card">
            <h3>Order History</h3>
            {orders.length === 0 ? (
              <div className="no-orders">
                <p>No orders yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="order-row">
                  <div>
                    <p className="order-num">Order #{order.orderNumber}</p>
                    <p className="order-date">{new Date(order.processedAt).toLocaleDateString()}</p>
                    <p className="order-items">{order.lineItems.edges.map(e => e.node.title).join(', ')}</p>
                  </div>
                  <div className="order-right">
                    <p className="order-price">{formatPrice(order.currentTotalPrice.amount, order.currentTotalPrice.currencyCode)}</p>
                    <span className={`order-status ${order.fulfillmentStatus.toLowerCase()}`}>
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
