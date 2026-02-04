import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  categoryId: number;
}

function ProductEditPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductForm initialData={product} />
    </div>
  );
}

export default ProductEditPage;
