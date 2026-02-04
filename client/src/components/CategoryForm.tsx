import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CategoryFormData {
  id?: number;
  name: string;
}

interface CategoryFormProps {
  initialData?: CategoryFormData;
}

function CategoryForm({ initialData }: CategoryFormProps) {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const isEditMode = initialData !== undefined;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = isEditMode ? `/api/v1/categories/${initialData?.id}` : '/api/v1/categories';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} category`);
      }
      navigate('/categories');
    } catch (error) {
      console.error(error);
      alert(`Error ${isEditMode ? 'updating' : 'creating'} category`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{isEditMode ? 'Edit' : 'Create'} Category</h2>
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
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}

export default CategoryForm;