import React, { useState, useEffect, useCallback } from 'react';
import { Row,  Button, Modal, Spinner} from 'react-bootstrap';
import adminService from '../services/admin';
export default function OrderDetailsModal(props) {
    const [order, setOrder] = useState(null);

    const fetchOrder = useCallback(async () => {
        let order = await adminService.getOrderDetails(props.orderID);
            if (order.error){
                console.log(order.error);
                props.onHide();
                return
            }
            
            setOrder(order.response.data);

      }, [props])
      useEffect(() => {
    
        fetchOrder();
    }, [fetchOrder])

    const getReadablePrice = (price) => {
        var dollars = price / 100;
        dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
        return dollars;
    }

    return (
        <Modal show={props.show} onHide={props.onHide} centered scrollable>
                <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!order && <div className="text-center mx-auto w-100">
                        <Spinner animation="border"/>
                        </div>}
                    {order && <div>
                        
                        {order.products.map((p, key) => {

                            return <div key={key}>
                                <Row className="justify-content-between align-items-center">
                                    <div className="col-auto">
                                    <p>
                                        {p.product.title} {p.quantity > 1 && `× ${p.quantity}`}
                                    </p>
                                    </div>
                                    <div className="col-auto">
                                    <img alt={`${p.product.title}`} src={p.product.img} style={{width:200, }} className="mb-3 text-center mx-auto"/>
                                    </div>
                                </Row>
                                <hr className="solid"/>

                            </div>
                        })}
                        <p>Total Price: {getReadablePrice(order.amount)}</p>

                        
                     </div>
                        
                    }
                             
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                                Close
                            </Button>
                </Modal.Footer>
            </Modal>
    )
}
