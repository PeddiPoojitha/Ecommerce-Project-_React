import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('Card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!address) {
      setError('Please provide a delivery address.');
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        userId: user?.id,
        items,
        total: subtotal,
        address,
        payment,
      });
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-layout">
      <form onSubmit={handleSubmit} className="auth-form checkout-form">
        <h2>Checkout</h2>
        <input placeholder="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="Card">Card</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
        {error && <p className="error-text">{error}</p>}
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Placing order...' : 'Place order'}
        </button>
      </form>
      <div className="summary-card">
        <h3>Order summary</h3>
        <p>Items: {items.length}</p>
        <p>Total: ${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
