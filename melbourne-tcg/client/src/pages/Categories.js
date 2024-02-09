import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='categories'>
      {categories.map((category) => (
        <Link to={`/categories/${category.id}`}>
          <div className="categoryCard" key={category.id}>
            <h2 className='categoryName'>{category.category_name}</h2>
            <img className="categoryImage" src={category.image} />
          </div>
        </Link>
      ))}
    </div>
  );
};


export default Categories;