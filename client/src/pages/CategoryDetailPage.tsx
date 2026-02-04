import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

interface Product {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  products: Product[];
}

function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading, error } = useFetch<Category>(`/api/v1/categories/${id}`);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`/api/v1/categories/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete category');
        }
        navigate('/categories');
      } catch (err) {
        const errorMessage = (err as Error).message || 'An unknown error occurred';
        console.error(err);
        alert(errorMessage);
      }
    }
  };

  if (isLoading) return <div>Loading Category...</div>;
  if (error) return <div>Error fetching category: {error.message}</div>;
  if (!category) return <div>Category not found.</div>;

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-section">
          <span className="details-label">Name:</span>
          <span className="details-value">{category.name}</span>
        </div>
        
        <div className="details-section">
          <span className="details-label">Products in this Category:</span>
          {category.products.length > 0 ? (
            <ul>
              {category.products.map(product => (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`} className="details-link">
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products in this category.</p>
          )}
        </div>

        <div className="button-container">
            <Link to={`/categories/${category.id}/edit`} className="btn edit">Edit</Link>
            <button onClick={handleDelete} className="btn delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetailPage;
