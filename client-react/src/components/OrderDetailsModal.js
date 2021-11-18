import React, { useState, useRef } from 'react'
import { Form,  Button, Modal} from 'react-bootstrap'
export default function OrderDetailsModal(props) {

    const imageRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const categoriesRef = useRef();
    const priceRef = useRef();
    const [inStock, setInStock] = useState(true)

    return (
        <Modal show={props.show} onHide={props.onHide} centered scrollable>
                <Modal.Header>
                <Modal.Title>Create New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form onSubmit={(event) =>{
                        event.preventDefault();

                        props.onHide();
                        var newProduct = {
                            categories: categoriesRef.current.value,
                            img: imageRef.current.value,
                            desc: descRef.current.value,
                            title: titleRef.current.value,
                            inStock: inStock,
                            price: priceRef.current.value
                        }
                        props.onCreateProduct(newProduct);
                    }}>
                            <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control ref={imageRef} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control ref={descRef} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Categories (Seperated by comma)</Form.Label>
                            <Form.Control ref={categoriesRef} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Price in cents</Form.Label>
                            <Form.Control ref={priceRef} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="In Stock" required checked ={inStock} onChange={(e) => {
                                setInStock(e.target.checked)
                            }} />

                            </Form.Group>
                            
                <Button type="submit" variant="primary" className={"m-2"}>
                    Create
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                                Cancel
                            </Button>
                        </Form>           
                </Modal.Body>
                <Modal.Footer>
                
                </Modal.Footer>
            </Modal>
    )
}
