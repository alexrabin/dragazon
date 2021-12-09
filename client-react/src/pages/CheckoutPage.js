import React, {useRef, useContext} from 'react'
import {Container, Row, Button, Form} from 'react-bootstrap'
import { useNavigate } from 'react-router';
import AppContext from '../components/AppContext';
import CartProduct from '../components/CartProduct'
import mainService from '../services/main';
export default function CheckoutPage() {
    const streetRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const zipRef = useRef(null);
    const navigate = useNavigate()
    const appContext = useContext(AppContext)

    const getReadablePrice = (price) => {
      var dollars = price / 100;
      dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
      return dollars;
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        
        const address = {
            street : streetRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            zipcode: zipRef.current.value
        }
        console.log(address);
        const orderData = await mainService.createOrder(address);
        appContext.setCart({});
        appContext.fetchOrders();
        navigate('/orders')

      };
    return (
        <AppContext.Consumer>
            {({profile, cart}) => (
                <Container className='mt-3 text-white'>
                    <h1 className='text-center text-white'>Checkout</h1>
                    <Row>
                        <div className="col">
                            <h3>Enter your address</h3>
                            <Form  className="col-md-8 mb-5 mt-3"
                            onSubmit={(e) => {
                                submitHandler(e);
                            }}
                            >                       
                            <Form.Group className="mb-3" controlId="street">
                                <Form.Control
                                ref={streetRef}
                                type="text"
                                placeholder="Street"
                                required
                                />
                            </Form.Group>   
                            <Form.Group className="mb-3" controlId="city">
                                <Form.Control
                                ref={cityRef}
                                type="text"
                                placeholder="City"
                                required
                                />
                            </Form.Group>   
                            <Form.Group className="mb-3" controlId="state">
                                <Form.Control
                                ref={stateRef}
                                type="text"
                                placeholder="State"
                                required
                                />
                            </Form.Group>   
                            <Form.Group className="mb-3" controlId="zipcode">
                                <Form.Control
                                ref={zipRef}
                                type="number"
                                placeholder="Zipcode"
                                required
                                />
                            </Form.Group>   
                            {cart.totalPrice && <div className='text-center'>
                                <p>Total: {getReadablePrice(cart.totalPrice)}</p>
                                <Button
                                    variant="danger"
                                    type="submit"
                                    style={{
                                    paddingRight: 50,
                                    paddingLeft: 50,
                                    borderRadius: "1% 25% / 80% ",
                                    color:"ivory",
                                    fontWeight:"700",
                                    }}
                                    disabled={cart.products===0}
                                    
                                >
                                Checkout
                                </Button>
                            </div>}
                            </Form>
                            
                        </div>
                        <div className="col">
                            {cart.products && cart.products.map((p, key) => {
                                return <div key={key}>
                                    <CartProduct p={p} editable={false}/>
                                </div>
                            })}
                        </div>
                    </Row>
                </Container>
            )}
        </AppContext.Consumer>
    )
}
