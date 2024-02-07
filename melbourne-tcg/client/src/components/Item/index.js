import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Item = () => {
    const {itemId} = useParams();

    console.log(itemId);

    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/items/${itemId}`);

        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setItem(data);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching item:', error);
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
        {item.name}
    </div>
    );
};


export default Item;