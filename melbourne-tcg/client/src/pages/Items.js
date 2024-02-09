import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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
       <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
        {items.map((item) => (
            <tr key={item.id}>
                <td>
                    <Link className='itemName' to={`/items/${item.id}`} >
                    {item.name}
                    </Link>
                </td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  );
};


export default Items;