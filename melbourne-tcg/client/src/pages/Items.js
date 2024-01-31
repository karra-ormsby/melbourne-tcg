import React, { useState, useEffect } from 'react';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/items');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
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
    <div>
      {items.map((item) => (
        <div className='itemCard' key={item.id}>
          <h2>{item.name}</h2>
          <h3>{item.description}</h3>
          <h3>{item.quantity}</h3>
          <h3>${item.price}</h3>
        </div>
      ))}
    </div>
  );
};


export default Items;