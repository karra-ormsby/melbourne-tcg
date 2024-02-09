import React, { useState, useEffect } from "react";

const AddListings = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        price: '',
        categoryId: ''
    });
    const [newItem, setNewItem] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        const dataToSend = {
            name: formData.name,
            description: formData.description,
            quantity: formData.quantity,
            price: formData.price,
            category_id: formData.categoryId
        };

        console.log(dataToSend);

        try {
            const response = await fetch('http://localhost:3001/api/items', {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setNewItem(data);
            setLoading(false);

            setFormData({
                name: '',
                description: '',
                quantity: '',
                price: '',
                categoryId: ''
            });

        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }

        if (loading) {
            return <p>Loading...</p>;
        }

    };

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

    return (
        <div>
            <form style={{fontSize:"50px"}}>
                <label htmlFor="name">Name</label>
                <input style={{ fontSize: "50px" }} id="name" type='text' name='name' value={formData.name} onChange={handleChange} />
                <br />

                <label htmlFor="desc">Description</label>
                <input style={{ fontSize: "50px" }} id="desc" type='text' name='description' value={formData.description} onChange={handleChange} />
                <br />

                <label htmlFor="quantity">Quantity</label>
                <input style={{ fontSize: "50px" }} id="quantity" type='text' name='quantity' value={formData.quantity} onChange={handleChange} />
                <br />

                <label htmlFor="price">Price</label>
                <input style={{ fontSize: "50px" }} id="price" type='text' name='price' value={formData.price} onChange={handleChange} />
                <br />

                <label htmlFor="cat">Category</label>                
                <select style={{ fontSize: "50px" }} name='categoryId' value={formData.categoryId} onChange={handleChange}>
                    <option value='' disabled>Please select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.category_name}</option>
                    ))}
                </select>

                <br />

                <button style={{fontSize:"50px"}} type='submit' onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default AddListings;