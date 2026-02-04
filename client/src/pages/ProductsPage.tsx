import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

interface Product {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
}

function ProductsPage() {
  const { data: products, isLoading, error } = useFetch<Product[]>('/api/v1/products');

  if (isLoading) return <div>Loading Products...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;

  return (
    <div className="list-container">
      <div className="page-header">
        <h1>Products</h1>
        <Link to="/products/create" className="btn">Create Product</Link>
      </div>
      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link to={`/products/${product.id}`} className="details-link">
                  {product.name}
                </Link>
              </td>
              <td>{product.price}€</td>
              <td>{product.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;