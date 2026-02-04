import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

function Dashboard() {
  const { data: categories, isLoading: isLoadingCategories } = useFetch<Category[]>('/api/v1/categories');
  const { data: products, isLoading: isLoadingProducts } = useFetch<Product[]>('/api/v1/products');

  if (isLoadingCategories || isLoadingProducts) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-counters">
        <div className="counter-card">
          <h2>Product Count: {products?.length || 0}</h2>
        </div>
        <div className="counter-card">
          <h2>Category Count: {categories?.length || 0}</h2>
        </div>
      </div>
      <div className="dashboard-nav-links">
        <Link to="/products" className="btn btn-dashboard">View Products</Link>
        <Link to="/categories" className="btn btn-dashboard">View Categories</Link>
      </div>
    </div>
  );
}

export default Dashboard;
