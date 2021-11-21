import React, { useState } from 'react'
import {Col, Container, Row, Placeholder, Card, ListGroupItem,ListGroup} from 'react-bootstrap'
import logo from "../assets/dragazonlogo.png";

export default function HomePage() {
    const blank_array = "12345678".split('');
    const [loading, setLoading] = useState(true);
    return (
        <Container className="text-center mt-5 mb-5">
            <h1 className="mb-4">Welcome to Dragazon</h1>
            <Row className="justify-content-center mx-auto gy-4 gx-4">
                {loading && blank_array.map((i, key)=> (
                 <Card style={{ width: '18rem' }}>
                 <Card.Img variant="top" src={logo} />
                 <Card.Body>
                   <Card.Title>Card Title</Card.Title>
                   <Card.Text>
                     Some quick example text to build on the card title and make up the bulk of
                     the card's content.
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
