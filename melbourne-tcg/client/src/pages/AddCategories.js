import React, { useState, useEffect } from "react";

const AddCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
    });
    const [newCategory, setNewCategory] = useState([]);
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
            category_name: formData.name,
            image: formData.image,
        };

        console.log(dataToSend);

        try {
            const response = await fetch('http://localhost:3001/api/categories', {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setNewCategory(data);
            setLoading(false);

            setFormData({
                name: '',
                image: '',
            });

        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }

        if (loading) {
            return <p>Loading...</p>;
        }

    };

    return (
        <div>
            <form style={{fontSize:"50px"}}>
                <label htmlFor="name">Name</label>
                <input style={{ fontSize: "50px" }} id="name" type='text' name='name' value={formData.name} onChange={handleChange} />
                <br />

                <label htmlFor="desc">Image</label>
                <input style={{ fontSize: "50px" }} id="desc" type='text' name='image' value={formData.image} onChange={handleChange} />
                <br />

                <button style={{fontSize:"50px"}} type='submit' onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default AddCategory;