import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
}

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useFetch<Product>(`/api/v1/products/${id}`);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/v1/products/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        navigate('/products');
      } catch (error) {
        console.error(error);
        alert('Error deleting product');
      }
    }
  };

  if (isLoading) return <div>Loading Product...</div>;
  if (error) return <div>Error fetching product: {error.message}</div>;
  if (!product) return <div>Product not found.</div>;


  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-section">
          <span className="details-label">Name:</span>
          <span className="details-value">{product.name}</span>
        </div>
        <div className="details-section">
          <span className="details-label">Description:</span>
          <span className="details-value">{product.description}</span>
        </div>
        <div className="details-section">
          <span className="details-label">Price:</span>
          <span className="details-value">€{product.price}</span>
        </div>
        <div className="details-section">
          <span className="details-label">Stock:</span>
          <span className="details-value">{product.stockQuantity}</span>
        </div>
        <div className="details-section">
          <span className="details-label">Status:</span>
          <span className="details-value">{product.isActive ? 'Active' : 'Inactive'}</span>
        </div>
        <div className="button-container">
          <Link to={`/products/${product.id}/edit`} className="btn edit">Edit</Link>
          <button onClick={handleDelete} className="btn delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
