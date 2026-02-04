import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductCreatePage from './pages/ProductCreatePage';
import CategoryCreatePage from './pages/CategoryCreatePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductEditPage from './pages/ProductEditPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import CategoryEditPage from './pages/CategoryEditPage';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="link">Dashboard</Link>
          <Link to="/products" className="link">Products</Link>
          <Link to="/categories" className="link">Categories</Link>
        </div>
      </nav>
      <hr />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<ProductCreatePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id/edit" element={<ProductEditPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/create" element={<CategoryCreatePage />} />
          <Route path="/categories/:id" element={<CategoryDetailPage />} />
          <Route path="/categories/:id/edit" element={<CategoryEditPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;