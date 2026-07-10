import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 4));
      } catch (err) {
        setError('Could not load featured products.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">New Season</p>
          <h1>Upgrade your everyday essentials.</h1>
          <p>Discover premium products, curated for modern living.</p>
          <Link to="/products" className="primary-btn">
            Shop now
          </Link>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-bag">S</div>
          <span>Fast delivery</span>
          <span>Premium picks</span>
          <span>Easy checkout</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <Link to="/products">View all</Link>
        </div>
        {loading && <p className="page-state">Loading featured products...</p>}
        {error && <p className="error-text">{error}</p>}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image && <img src={product.image} alt={product.name} className="product-image" />}
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p className="price">${product.price}</p>
              <Link to={`/products/${product.id}`} className="secondary-btn">
                View details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
