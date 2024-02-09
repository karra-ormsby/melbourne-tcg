import React, { useState } from "react";

const AddCategory = () => {
    const [formData, setFormData] = useState({
        name: '',
        // Initialise image to null
        image: null,
    });
    const [newCategory, setNewCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // If the input is a file, use e.target.files[0] to access the selected file
        const newValue = e.target.type === 'file' ? e.target.files[0] : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // Create a FormData object to handle file uploads
        const dataToSend = new FormData();
        dataToSend.append('category_name', formData.name);
        dataToSend.append('image', formData.image);

        console.log("dataToSend");
        console.log([...dataToSend.entries()]);

        try {
            const response = await fetch('http://localhost:3001/api/categories', {
                method: 'POST',
                body: dataToSend,
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setNewCategory(data);
            setLoading(false);

            // Clear form data after successful save
            setFormData({
                name: '',
                // Reset image to null after upload
                image: null,
            });

        } catch (error) {
            console.error('Error uploading file:', error);
        }

        if (loading) {
            return <p>Loading...</p>;
        }

    };

    return (
        <div>
            <form style={{ fontSize: "50px" }}>
                <label htmlFor="name">Name</label>
                <input style={{ fontSize: "50px" }} id="name" type='text' name='name' value={formData.name} onChange={handleChange} />
                <br />

                <label htmlFor="image">Image</label>
                <input type="file" name='image' onChange={handleChange} />
                <br />

                <button style={{ fontSize: "50px" }} type='submit' onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default AddCategory;
