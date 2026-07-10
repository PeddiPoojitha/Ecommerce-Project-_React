import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  return (
    <div className="empty-state">
      <h2>Order placed successfully!</h2>
      <p>Your package is on the way.</p>
      <Link to="/products" className="primary-btn">
        Continue shopping
      </Link>
    </div>
  );
}
