import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
}

interface ProductFormData {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  categoryId: number;
}

interface ProductFormProps {
  initialData?: ProductFormData;
}

function ProductForm({ initialData }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const isEditMode = initialData !== undefined;

  // Effect for fetching categories - runs once
  useEffect(() => {
    fetch('/api/v1/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Effect for populating the form in edit mode
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setStockQuantity(initialData.stockQuantity);
      setCategoryId(initialData.categoryId);
      setIsActive(initialData.isActive);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price,
      stockQuantity,
      categoryId: Number(categoryId),
      isActive,
    };

    const url = isEditMode ? `/api/v1/products/${initialData?.id}` : '/api/v1/products';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} product`);
      }

      navigate('/products');

    } catch (error) {
      console.error(error);
      alert(`Error ${isEditMode ? 'updating' : 'creating'} product`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{isEditMode ? 'Edit' : 'Create'} Product</h2>
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="stockQuantity">Stock Quantity</label>
          <input
            type="number"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          required
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend>Status</legend>
        <div className="radio">
          <input
            type="radio"
            id="active"
            name="status"
            value="true"
            checked={isActive === true}
            onChange={() => setIsActive(true)}
          />
          <label htmlFor="active">Active</label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id="inactive"
            name="status"
            value="false"
            checked={isActive === false}
            onChange={() => setIsActive(false)}
          />
          <label htmlFor="inactive">Inactive</label>
        </div>
      </fieldset>
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}

export default ProductForm;