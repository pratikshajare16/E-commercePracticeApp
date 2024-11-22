import React, { useEffect, useState } from 'react'
import Header from './Navigation/Header'
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProduct = ({ route }) => {
    const location = useLocation();
    const { Id, Name, Price, Description, Image } = location.state || {};

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState("")
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate()
    var ImageName = "";
    useEffect(() => {
        setProduct();
    }, [])


    function setProduct() {
        setProductName(Name);
        setProductPrice(Price);
        setProductImage(Image);
        setProductDescription(Description)


    }

    async function updateProduct() {
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('description', productDescription);

        if (productImage instanceof File) {
            formData.append('productImage', productImage); // Only append if it's a file object
        }

        try {
            const response = await fetch(`http://localhost:4000/products/${Id}`, {
                method: 'PATCH',
                body: formData, // Send the FormData
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Product ${productName} Updated`);
                navigate("/")
            } else {
                console.error("Failed to update product:", response.statusText);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }


    return (
        <>
            <Header />
            <div className='col-sm-6 offset-sm-3' style={{ marginTop: "2%" }}>
                <h2>Update Product</h2>
                <br />

                <textarea
                    className='form-control'
                    placeholder='Name'
                    type='text'
                    defaultValue={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />

                <br />

                <input
                    className='form-control'
                    placeholder='Price'
                    type='text'
                    defaultValue={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />


                <br />


                <textarea
                    className='form-control'
                    placeholder='Description'
                    type='tel'
                    defaultValue={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                />


                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e) => {
                            setProductImage(e.target.files[0]);
                            console.log(productImage)
                            const file = e.target.files[0];
                            // Update with the actual file object
                            if (file) {
                                const previewURL = URL.createObjectURL(file);
                                setPreview(previewURL); // Optional preview for the image
                            } else {
                                setPreview(null);
                            }
                        }}

                    />


                    {preview != null ?
                        <div style={{ marginTop: '10px' }}>
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ width: '150px', height: 'auto', borderRadius: '5px' }}
                            />
                        </div>
                        :
                        <div>
                            <img style={{ width: 140 }} src={"http://localhost:4000/" + productImage} alt='' />
                            <label>{productImage && productImage.split("\\")[1].split("-")[4]}</label>
                        </div>

                    }


                </div>

                <button className='btn btn-primary' type='Submit' onClick={updateProduct}>
                    Submit
                </button>
            </div >
        </>
    )
}

export default UpdateProduct