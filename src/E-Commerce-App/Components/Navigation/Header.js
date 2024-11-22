import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {

    const userName = JSON.parse(localStorage.getItem('user-info'));
    const [searchTerm, setSearchTerm] = useState('');

    const location = useLocation();
    const navigate = useNavigate()
    function logout() {

        localStorage.clear();
        navigate("/login");
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Search Term:', searchTerm);

        if (searchTerm !== "") {
            let result = await fetch(`http://localhost:4000/products/${searchTerm}`, {
                method: "POST"
            });
            result = await result.json();

            navigate("/", { state: { data: result } })
        } else {
            navigate("/", { state: { data: "" } })
        }
    };

    const userInfo = localStorage.getItem('user-info');
    const shouldShowSearch = location.pathname === '/' && userInfo;
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#">E-Commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {localStorage.getItem('user-info') ?
                                <>
                                    <Nav.Link as={Link} to="/" >Product List</Nav.Link>

                                    <Nav.Link as={Link} to="/add_product">Add Product</Nav.Link>

                                    {/* <Nav.Link as={Link} to="/update_product">Update Product</Nav.Link> */}
                                </>

                                :
                                <>

                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                </>

                            }

                        </Nav>
                        {localStorage.getItem('user-info') ?
                            <>
                                {shouldShowSearch && (
                                    <Form className="d-flex" onSubmit={handleSearch} >
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                            style={{ color: "white" }}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <Button style={{ marginRight: "5%" }} variant="outline-success" type="submit">Search</Button>
                                    </Form>
                                )}

                                <Nav>

                                    <NavDropdown title={userName && userName[0].username}
                                        id="navbarScrollingDropdown" align="end">
                                        <NavDropdown.Item href="#action3" onClick={logout}>Logout</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            User Profile
                                        </NavDropdown.Item>
                                        {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item> */}
                                    </NavDropdown>
                                </Nav>
                            </>
                            : null}
                        {/* <Nav.Link href="#" disabled>
                            Link 
                        </Nav.Link>  */}


                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header