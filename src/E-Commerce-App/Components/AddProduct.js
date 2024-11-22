import React, { useState } from 'react'
import Header from './Navigation/Header'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState("")
    const navigate = useNavigate();

    async function AddProduct() {
        console.log(productName, productDescription, productImage, productPrice)

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', " ₹" + productPrice);
        formData.append('productImage', productImage);
        formData.append('description', productDescription);

        if (productName !== "" && productPrice !== "" && productImage !== "") {
            try {
                let result = await fetch("http://localhost:4000/products", {
                    method: 'POST',
                    body: formData, // Use formData directly as body
                });

                // Handle the response
                const response = await result.json();
                console.log("Server response:", response.message);
                alert(response.message)
                navigate("/")
            } catch (error) {
                console.error("Error uploading product:", error);
            }
        } else {
            alert("Failed to add product, add required data")
        }
    }
    return (
        <>
            <Header />
            <div className='col-sm-6 offset-sm-3' style={{ marginTop: "2%" }}>
                <h2>Add Product</h2>
                <br />
                <div className='row mb-3'>
                    <div className='col-md-4  ' style={{ marginTop: "1%" }}>
                        <label >
                            Name <span style={{ color: 'red' }}>*</span>
                        </label>
                    </div>
                    <div className='col-md-8'>
                        <input
                            className='form-control'
                            placeholder='Name'
                            type='text'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-md-4' style={{ marginTop: "1%" }}>
                        <label>
                            Price <span style={{ color: 'red' }}>*</span>
                        </label>
                    </div>
                    <div className='col-md-8'>
                        <input
                            className='form-control'
                            placeholder='Price'
                            type='text'
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-md-4' style={{ marginTop: "1%" }}>
                        <label>
                            Upload Image <span style={{ color: 'red' }}>*</span>
                        </label>
                    </div>
                    <div className='col-md-8'>
                        <input
                            className='form-control'
                            placeholder='Upload Image'

                            type='file'
                            onChange={(e) => setProductImage(e.target.files[0])}
                            required
                        />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-md-4' style={{ marginTop: "1%" }}>
                        <label>
                            Description <span style={{ color: 'red' }}>*</span>
                        </label>
                    </div>
                    <div className='col-md-8'>
                        <input
                            className='form-control'
                            placeholder='Description'
                            type='tel'
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button className='btn btn-primary' type='Submit' onClick={AddProduct}>
                    Submit
                </button>
            </div>

        </>
    )
}

export default AddProduct