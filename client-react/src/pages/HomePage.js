import React, { useState, useEffect } from 'react';
import {Container, Row, Card, ListGroupItem,ListGroup, Spinner, Carousel} from 'react-bootstrap';
import adminService from '../services/admin';
import { useNavigate } from "react-router-dom";


import "./HomePage.css";

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    const fetchAllProducts = async () => {
      setLoading(true);

      let allProducts = await adminService.getAllProducts();
          if (allProducts.error){
              setAllProducts("Could not load products");
          }
          else{
              setLoading(false);
              setAllProducts(allProducts.response.data);
          }
    }

      useEffect(() => {
      
        fetchAllProducts();
    }, [])

    const getReadablePrice = (price) => {
      var dollars = price / 100;
      dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
      return dollars;
  }

    return (
        <Container className="text-center mb-5">
            <h1 className="mb-4" style={{color: "rgb(170,1,20)"}}>Welcome to Dragazon</h1>
            <h2 className="mb-4" style={{color: 'ivory'}}>Home of All your Dragon Needs!</h2>
            {loading && <div className="text-center mx-auto w-100">
                        <Spinner animation="border"/>
                        </div>}
            {!loading && <Carousel fade className="mb-5">
              
                {allProducts.slice(0,3).map((product, key)=> (
                  <Carousel.Item key={key} onClick={() => {
                    navigate('/product', { state: {product} });
                  }}>
                      <img
                        className="d-block w-100"
                        src={product.img}
                        alt={product.title}
                        style={{height: 400, objectFit:'cover'}}
                      />
                      <Carousel.Caption>
                        <h3>{product.title}</h3>
                        <p>{product.desc}</p>
                      </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>}
            <Row className="justify-content-center mx-auto gy-4 gx-4">
                {!loading && allProducts.slice(3).map((product, key)=> (
                 <Card style={{ width: '18rem', margin:10}} key={key} onClick={() => {
                  navigate('/product', { state: {product} });
                }}>
                 <Card.Img variant="top" src={product.img} className="w-100" style={{contain:""}}/>
                 <Card.Body>
                   <Card.Title>{product.title}</Card.Title>
                   <Card.Text>
                     {product.desc}
                   </Card.Text>
                 </Card.Body>
                 <ListGroup className="list-group-flush">
                   <ListGroupItem>{getReadablePrice(product.price)}</ListGroupItem>
                 </ListGroup>
                 <Card.Body>
                   <Card.Link href="#">Add to Cart</Card.Link>
                   <Card.Link href="#">Buy</Card.Link>
                 </Card.Body>
               </Card>   
                       


                ))}
            </Row>
        </Container>
    )
}
