import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/api';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Could not load product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="page-state">Loading product...</p>;
  }

  if (error || !product) {
    return <p className="error-text">{error || 'Product not found.'}</p>;
  }

  return (
    <div className="detail-card">
      <button className="ghost-btn" onClick={() => navigate('/products')}>
        &lt;- Back to products
      </button>
      <img src={product.image} alt={product.name} className="detail-image" />
      <h2>{product.name}</h2>
      <p className="price">${product.price}</p>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <button className="primary-btn" onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}
