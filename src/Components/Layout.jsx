import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          ShopSphere
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({totalItems})</NavLink>
        </nav>
        <div className="auth-actions">
          {user ? (
            <>
              <span className="user-pill">Hi, {user.username}</span>
              <button className="ghost-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="primary-btn">
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
