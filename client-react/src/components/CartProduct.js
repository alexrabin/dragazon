import React, {useContext} from 'react'
import mainService from '../services/main';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

import AppContext from '../components/AppContext';


export default function CartProduct(props) {
    const {p} = props;

    const appContext = useContext(AppContext)

    const getReadablePrice = (price) => {
        var dollars = price / 100;
        dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
        return dollars;
      }

    return (
        <div>
            <div className="text-white text-center">
              <div className="mb-3">
                  <img alt={`${p.product.title}`} src={p.product.img} style={{width:200, }} className=""/>
                  </div>
                  <div className="">
                  <p>
                      {p.product.title} {!props.editable && `× ${p.quantity}`}
                  </p>
                  <div className="text-center">

                    {props.editable && <div className='quanity-group mb-3'>
                        <Button
                        variant="secondary"
                            className='quan-buttons m-2' 
                            disabled={p.quantity<=1}
                         onClick={async () => {
                            await mainService.removeFromCart(p.productId, 1);
                                let cart = await mainService.getCart();
                                appContext.setCart(cart.response.data);
                         }}> 
                            <FaMinus/> 
                        </Button>
                        {p.quantity}
                        <Button
                            className='quan-buttons m-2'
                            onClick={async () => {
                                await mainService.addToCart(p.productId, 1);
                                let cart = await mainService.getCart();
                                appContext.setCart(cart.response.data);

                            }}> 

                            <FaPlus/> 
                        </Button>
                    </div>}
                    </div>
                  <p>
                      {getReadablePrice(p.quantity * p.product.price)}
                  </p>
                  {props.editable && <Button variant="danger" size="sm" onClick={async() => {
                      await mainService.removeFromCart(p.productId, p.quantity);
                      let cart = await mainService.getCart();
                      appContext.setCart(cart.response.data);
                  }}>Remove</Button>}
                  </div>
                  
              </div>
              <hr className="solid text-white"/>
        </div>
    )
}
