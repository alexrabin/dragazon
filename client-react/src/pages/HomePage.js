import React, { useState, useEffect } from 'react'
import {Container, Row, Card, ListGroupItem,ListGroup} from 'react-bootstrap'
import logo from "../assets/dragazonlogo.png";
import adminService from '../services/admin';
import "./HomePage.css";

export default function HomePage() {
    const blank_array = "12345678".split('');
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);

    const fetchAllProducts = async () => {
      let allProducts = await adminService.getAllProducts();
          if (allProducts.error){
              setAllProducts("Could not load products");
          }
          else{
              setAllProducts(allProducts.response.data);
          }
    }

      useEffect(() => {
      
        fetchAllProducts();
    }, [])

    return (
        <Container className="text-center mt-5 mb-5">
            <h1 className="mb-4">Welcome to Dragazon</h1>
            <Row className="justify-content-center mx-auto gy-4 gx-4">
                {loading && allProducts.map((product, key)=> (
                 <Card style={{ width: '18rem', margin:10}} key={key}>
                 <Card.Img variant="top" src={product.img} className="w-100" style={{contain:""}}/>
                 <Card.Body>
                   <Card.Title>{product.title}</Card.Title>
                   <Card.Text>
                     {product.desc}
                   </Card.Text>
                 </Card.Body>
                 <ListGroup className="list-group-flush">
                   <ListGroupItem>Cras justo odio</ListGroupItem>
                   <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                   <ListGroupItem>Vestibulum at eros</ListGroupItem>
                 </ListGroup>
                 <Card.Body>
                   <Card.Link href="#">Card Link</Card.Link>
                   <Card.Link href="#">Another Link</Card.Link>
                 </Card.Body>
               </Card>   
                       


                ))}

                {!loading && <h1>Showing Inventory</h1>}
            </Row>
        </Container>
    )
}
