import React, { useState, useContext} from 'react'
import {Container, Row, Button, Badge} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import mainService from '../services/main';
import { FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import AppContext from '../components/AppContext';
export default function ProductPage() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const appContext = useContext(AppContext)
    const getReadablePrice = (price) => {
        var dollars = price / 100;
        dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
        return dollars;
    }
    const [quanity, setQuanity] = useState(1)
    return (
        <Container className="mt-3">
            <div className="mb-5 text-white">
                <FaArrowLeft onClick={()=> {
                    navigate("/");
                }}/>
            </div>
            <div>
                <Row className="justify-content-center ">
                <div className="col-md-4 col-lg-6 mb-3" style={{color:'ivory'}}>
                    <h3>{state.product.title}</h3>
                    <hr/>
                    <p>{state.product.desc}</p>
                    <hr/>
                    <div>
                        <strong>Price:</strong> {getReadablePrice(state.product.price)}
                    </div>
                    <hr/>
                    {state.product.categories && state.product.categories.map((category, cKey) => <Badge key={cKey}className="col-auto m-1" bg="danger" >{category}</Badge>)}
<hr/>
                    <div className="text-center">

                    <div className='quanity-group mb-3'>
                        <Button
                        variant="secondary"
                            className='quan-buttons m-2' 
                            disabled={quanity<=1 || appContext.profile===null}
                         onClick={() => setQuanity(prev => prev-1)}> 
                            <FaMinus/> 
                        </Button>
                        {quanity}
                        <Button
                            disabled={quanity>=9 || appContext.profile===null}
                            className='quan-buttons m-2'
                            onClick={() => setQuanity(prev => prev+1)}> 

                            <FaPlus/> 
                        </Button>
                    </div>

                    <Button
                        variant="danger"
                        style={{
                        paddingRight: 50,
                        paddingLeft: 50,
                        borderRadius: "1% 25% / 80% ",
                        color:"ivory",
                        fontWeight:"700",
                        }}
                        disabled={appContext.profile===null}
                        onClick={async () => {
                            await mainService.addToCart(state.product._id, quanity);
                            let cart = await mainService.getCart();
                            appContext.setCart(cart.response.data);
                            setQuanity(1);
                        }}
                    >
                        Add To Cart
                    </Button>
                    
                    </div>
                </div>
                <div className="col-md-8 col-lg-6 text-center">
                    <img src={state.product.img}  alt={`${state.product.title}`} className="mb-3 text-center mx-auto w-100"/>
                </div>
                </Row>
            </div>
        </Container>
    )
}
