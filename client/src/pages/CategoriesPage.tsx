import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

interface Category {
  id: number;
  name: string;
}

function CategoriesPage() {
  const { data: categories, isLoading, error } = useFetch<Category[]>('/api/v1/categories');

  if (isLoading) return <div>Loading Categories...</div>;
  if (error) return <div>Error fetching categories: {error.message}</div>;

  return (
    <div className="list-container">
      <div className="page-header">
        <h1>Categories</h1>
        <Link to="/categories/create" className="btn">Create Category</Link>
      </div>
      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.map((category) => (
            <tr key={category.id}>
              <td>
                <Link to={`/categories/${category.id}`} className="details-link">
                  {category.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesPage;