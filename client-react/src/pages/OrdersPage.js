import React, {useState} from 'react'
import { Container } from 'react-bootstrap'
import AppContext from '../components/AppContext'
import OrderDetailsModal from '../components/OrderDetailsModal';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';

export default function OrdersPage() {
    const [orderToShow, setOrderToShow] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const navigate = useNavigate();

    const getReadablePrice = (price) => {
        var dollars = price / 100;
        dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
        return dollars;
      }
    return (
        <AppContext.Consumer>
            {({orders}) => {
                return (
                    <Container className="mt-3 text-white">
                    <div className="mb-2 text-white">
                        <FaArrowLeft size={25} onClick={()=> {
                            navigate("/");
                        }}/>
                    </div>
                    <h1 className='text-center'>Orders</h1>
                    <hr className="solid text-white"/>
                    {orders !== undefined && orders.length === 0 && <div>
                        <h3>You have no orders</h3>
                    </div>}
                    {orders !== undefined && orders.map((order, key) => (
                        <div key={key} onClick={()=>{

                            setOrderToShow(order._id);
                            handleShow();
                        }}>
                            <h5>{ new Date(order.createdAt).toDateString()}</h5>
                            <p className="text-warning">Total: {getReadablePrice(order.amount)}</p>
                            <p className="text-info">{order.status.toUpperCase()}</p>
                            <hr className="solid text-white"/>
                        </div>
                    ))}

                    {orderToShow && <OrderDetailsModal orderID={orderToShow} show={showModal} onHide={()=>{
                                    handleClose();
                                    setOrderToShow(null);
                                }}/>}

                    </Container>)
            }
            }
        </AppContext.Consumer>
    )
}
