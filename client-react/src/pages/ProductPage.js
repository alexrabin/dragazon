import React, { } from 'react'
import {Container, Row, Button} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import mainService from '../services/main';
export default function ProductPage() {
    const {state} = useLocation();
    const getReadablePrice = (price) => {
        var dollars = price / 100;
        dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
        return dollars;
    }
    return (
        <Container className="mt-3">
            <div>
                <Row className="justify-content-center ">
                <div className="col-md-4 mb-3">
                    <h3>{state.product.title}</h3>
                    <hr/>
                    <p>{state.product.desc}</p>
                    <hr/>
                    <div>
                        <strong>Price:</strong> {getReadablePrice(state.product.price)}
                    </div>
                    <hr/>
                    <div className="text-center">
                    <Button
                        variant="danger"
                        style={{
                        paddingRight: 50,
                        paddingLeft: 50,
                        borderRadius: "1% 25% / 80% ",
                        color:"ivory",
                        fontWeight:"700",
                        }}

                        onClick={async () => {
                            await mainService.addToCart(state.product._id, 1);
                            let response = await mainService.getCart();
                            console.log(response);
                        }}
                    >
                        Add To Cart
                    </Button>
                    </div>
                </div>
                <div className="col-md-8 text-center">
                    <img src={state.product.img}  alt={`${state.product.title}`} style={{width:400 }} className="mb-3 text-center mx-auto "/>
                </div>
                </Row>
            </div>
        </Container>
    )
}
