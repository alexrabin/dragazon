import React, { useState, useEffect, useCallback } from 'react'
import { Container, Form, Accordion, Button, ButtonGroup, Modal} from 'react-bootstrap'
import authService from '../services/auth';
import adminService from '../services/admin';

import { useNavigate } from 'react-router-dom';
import UpdateProductModal from '../components/UpdateProductModal';
export default function AdminDashboardPage() {
    const [profile, setProfile] = useState(null)
    const [allUsers, setAllUsers] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [createNewProduct, setCreateNewProduct] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const navigate = useNavigate();

    const fetchAllUsers = async () => {
        let allUsers = await adminService.getAllUsers();
            if (allUsers.error){
                setAllUsers("Could not load users");
            }
            else{
                setAllUsers(allUsers.response.data);
            }
    }

    const fetchAllProducts = async () => {
        let allProducts = await adminService.getAllProducts();
            if (allProducts.error){
                setAllProducts("Could not load products");
            }
            else{
                setAllProducts(allProducts.response.data);
            }
    }

    const fetchProfile = useCallback(async () => {
        let user = await authService.getLoggedInUser();
            if (user.error){
                navigate('/login');
                return
            }
            if (!user.response.data.isAdmin){
                navigate('/');
                return
            }
            fetchAllUsers();
            fetchAllProducts();
            setProfile(user.response.data);

      }, [navigate])

    useEffect(() => {
    
        fetchProfile();
    }, [fetchProfile])

    const makeUserAdmin = async (userID) => {
        let makeAdmin = await adminService.makeUserAdmin(userID);
        if (makeAdmin.error){
            // setAllUsers("Could not load users");
        }
        else{
            fetchAllUsers();

        }
    }

    const deleteUser = async (userID) => {
        let deleteUser = await adminService.deleteUser(userID);
        if (deleteUser.error){
            console.log(deleteUser.error)
            // setAllUsers("Could not load users");
        }
        else{
            fetchAllUsers();

        }
    }

    const updateProduct = async (product) => {
        let updatedProd = await adminService.updateProduct(product._id, product.title, product.desc, product.img, product.categories, product.price, product.inStock);
        if (updatedProd.error){
            // setAllUsers("Could not load users");
        }
        else{
            fetchAllProducts();

        }
    }

    const deleteProduct = async (productID) => {
        let deleteProduct = await adminService.deleteProduct(productID);
        if (deleteProduct.error){
            console.log(deleteProduct.error)
            // setAllUsers("Could not load users");
        }
        else{
            fetchAllProducts();

        }
    }


    const getReadablePrice = (price) => {
        var dollars = price / 100;
        dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
        return dollars;
    }
    return (
        <Container className="mt-5 mb-5">
            <h1 className="mb-4">Admin Dashboard</h1>
            {profile && <>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Users</Accordion.Header>
                        <Accordion.Body>
                        {allUsers === "Could not load users" ? <p>{allUsers}</p> : 
                        allUsers.map((user, key) => {
                            return <div key={key}>

                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                    <Accordion.Header>{user.name}</Accordion.Header>
                                    <Accordion.Body>

                                    <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={user.name} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control value={user._id} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control value={user.email} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control value={user.username} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Admin</Form.Label>
                                        <Form.Control value={user.isAdmin} disabled />
                                    </Form.Group>

                                    <ButtonGroup aria-label="Admin Actions">
                                        {!user.isAdmin && <Button variant="primary" onClick={() => makeUserAdmin(user._id)}>Make Admin</Button>}
                                        <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete</Button>
                                        </ButtonGroup>

                                    
                                    </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                
                                </div>
                        })
                        }
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Products</Accordion.Header>
                        <Accordion.Body>
                        <div className='text-center mb-3'>
                            <Button variant="success" onClick={() =>{
                                            setCreateNewProduct(true);
                                            handleShow();

                                        }}>Create New Product</Button>
                        </div>
                        {allProducts === "Could not load products" ? <p>{allProducts}</p> : 
                        allProducts.map((product, key) => {
                            return <div key={key}>

                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                    <Accordion.Header>{product.title}</Accordion.Header>
                                    <Accordion.Body>
                                    <img src={product.img} style={{width:200, }} className="mb-3 text-center mx-auto"/>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control value={product.img} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control value={product.title} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control value={product.desc} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Categories</Form.Label>
                                    <Form.Control value={product.categories} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control value={getReadablePrice(product.price)} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                    <Form.Label>In Stock</Form.Label>
                                    <Form.Control value={product.inStock} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control value={product._id} disabled />
                                    </Form.Group>

                                    <ButtonGroup aria-label="Admin Actions">
                                        <Button variant="primary" onClick={() =>{
                                            setProductToUpdate(product);
                                            handleShow();

                                        }}>Update</Button>
                                        <Button variant="danger" onClick={() => {
                                            deleteProduct(product._id)
                                        }}>Delete</Button>
                                        </ButtonGroup>

                                    
                                    </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                
                                </div>
                        })
                        }
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Orders</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
            </>
            
            }
            {productToUpdate && <UpdateProductModal show={showModal} product={productToUpdate} onHide={()=>{
                handleClose();
                setProductToUpdate(null);
            }} onUpdatedProduct={(prod) => {
                console.log("Updated prod: ", prod);
                updateProduct(prod);

            }}/>}
            
        </Container>
    )
}
