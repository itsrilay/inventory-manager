import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryForm from '../components/CategoryForm';

interface Category {
  id: number;
  name: string;
}

function CategoryEditPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`/api/v1/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CategoryForm initialData={category} />
    </div>
  );
}

export default CategoryEditPage;
