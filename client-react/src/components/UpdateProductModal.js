import React, { useState, useRef, useEffect } from 'react'
import { Form,  Button, Modal} from 'react-bootstrap'
import authService from '../services/auth';
export default function UpdateProductModal(props) {

    const imageRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const categoriesRef = useRef();
    const priceRef = useRef();
    const [inStock, setInStock] = useState(props.product.inStock)
    
    useEffect(() => {
    
            imageRef.current.value = props.product.img;
            titleRef.current.value = props.product.title;
            descRef.current.value = props.product.desc;
            categoriesRef.current.value = props.product.categories.join(',');
            priceRef.current.value = props.product.price;
    }, [])

    return (
        <Modal show={props.show} onHide={props.onHide} centered scrollable>
                <Modal.Header>
                <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form>
                            <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control ref={imageRef}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control ref={descRef} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Categories</Form.Label>
                            <Form.Control ref={categoriesRef} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Price in cents</Form.Label>
                            <Form.Control ref={priceRef} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="In Stock" checked ={inStock} onChange={(e) => {
                                setInStock(e.target.checked)
                            }} />

                            </Form.Group>

                        </Form>           
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=> {
                    props.onHide();
                    var updatedProduct = {
                        _id:props.product._id,
                        categories: categoriesRef.current.value,
                        img: imageRef.current.value,
                        desc: descRef.current.value,
                        title: titleRef.current.value,
                        inStock: inStock,
                        price: priceRef.current.value
                    }
                    props.onUpdatedProduct(updatedProduct);

                }}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
    )
}
