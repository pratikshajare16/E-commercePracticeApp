import React, { useEffect, useState } from "react";
import Header from "./Navigation/Header";
import { Image, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ProductList = () => {
    const [data, setData] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedData = location.state?.data || [];

        if (fetchedData.length === 0) {
            fetchData();
        } else {
            setData(fetchedData.products || fetchedData);
        }
    }, [location.state?.data]);


    const fetchData = async () => {
        try {
            let response = await fetch("http://localhost:4000/products", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const result = await response.json();
            setData(result.products || []);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteProduct = async (id, name) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete product "${name}"?`);

        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:4000/products/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert(`Product "${name}" deleted successfully.`);
                    fetchData(); // Refresh the product list after deletion
                } else {
                    console.error("Failed to delete the product.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        } else {
            console.log("Deletion canceled!");
        }
    };

    return (
        <>
            <Header />
            <div style={{ margin: "2%" }}>
                <h2>Product List</h2>
            </div>
            <div style={{ margin: "5%", marginTop: 0 }}>
                <h6 style={{ textAlign: "left" }}>Product Count: {data.length}</h6>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th colSpan="2">Operations</th>
                        </tr>
                    </thead>
                    <tbody style={{ padding: "8px", textAlign: "center", verticalAlign: "middle" }}>
                        {data.length >= 0 ? (
                            data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <img
                                            style={{ width: 140 }}
                                            src={`http://localhost:4000/${item.productImage}`}
                                            alt="product"
                                        />
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <Image
                                            style={{
                                                width: "24%",
                                                alignSelf: "center",
                                                cursor: "pointer",
                                                display: "block",
                                                margin: "auto",
                                            }}
                                            src={require("../../Images/delete.png")}
                                            onClick={() => deleteProduct(item._id, item.name)}
                                        />
                                    </td>
                                    <td>
                                        <Image
                                            style={{
                                                height: 20,
                                                width: 20,
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                navigate("/update_product", {
                                                    state: {
                                                        Id: item._id,
                                                        Name: item.name,
                                                        Price: item.price,
                                                        Image: item.productImage,
                                                        Description: item.description,
                                                    },
                                                })
                                            }
                                            src={require("../../Images/edit.png")}
                                            alt="Edit product"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ProductList;
