import React, { useState } from 'react'
import {Col, Container, Row, Placeholder, Card} from 'react-bootstrap'


export default function HomePage() {
    const blank_array = "12345678".split('');
    const [loading, setLoading] = useState(true);
    return (
        <Container className="text-center mt-5 mb-5">
            <h1 className="mb-4">Welcome to Dragazon</h1>
            <Row className="justify-content-center mx-auto gy-4 gx-4">
                {loading && blank_array.map((i, key)=> (
                    
                        <Card className="col-auto p-4 m-3" key={key} style={{ width: '18rem' }}>
                            {/* <Card.Img variant="top" src={`https://source.unsplash.com/1600x900/?dragon`} /> */}
                            <Placeholder.Button variant="primary" size="lg" />

                            <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            {/* <Placeholder.Button variant="primary" xs={6} /> */}
                            </Card.Body>
                        </Card>
                    
                ))}

                {!loading && <h1>Showing Inventory</h1>}
            </Row>
        </Container>
    )
}
