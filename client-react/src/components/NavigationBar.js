import React, { useState} from "react";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  CloseButton,
  Badge
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dragazonlogoLight.png";
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import AppContext from './AppContext';
import './NavigationBar.css';



export default function NavigationBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const getTotalAmountOfProducts = (cart) => {
    if (cart.products === undefined){
      return 0;
    }
    const total = cart.products.map(prod => {
        return prod.quantity;
    }).reduce((a,b) => a+b);
    return total.toString()
}
  return (
    <AppContext.Consumer>
      {({profile, cart, logOut}) => (
        
<Navbar bg="dark" variant="dark" expand={false}>
<Container fluid>
 
  <Navbar.Brand>
    <a href="/">
      <img alt="Dragazon Logo" src={logo} style={{ width: 140, marginTop: 0}}></img>
    </a>
  </Navbar.Brand>
  <div className="row jusitfy-content-between align-items-center" style={{marginRight:10}}>
  <Navbar.Toggle aria-controls="cartOffCanvas" style={{marginRight:10}} className="text-white col-auto"
>
    <div className="row jusitfy-content-between align-items-center ">
      <FaShoppingCart className="col-auto"/>
      <Badge pill bg="danger" className="col-auto" style={{fontSize:11}}>
        {getTotalAmountOfProducts(cart)}
      </Badge>
    </div>
  </Navbar.Toggle>
    <Navbar.Toggle
      className="text-white col-auto"
      aria-controls="offcanvasNavbar"
      onClick={() => setShow(true)}
    >
      <FaBars/>
      </Navbar.Toggle>
  </div>
  <Navbar.Offcanvas
    show={show}
    onHide={() => setShow(false)}
    id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel"
    placement="end"
    className="bg-dark"
    bg="dark" variant="dark"
  >
    <Offcanvas.Header >
      <Offcanvas.Title id="offcanvasNavbarLabel">
        <a href="/">
          <img src={logo} alt="Dragazon Logo" style={{ width: 140, marginTop: 0 }}></img>
        </a>
      </Offcanvas.Title>
      <CloseButton variant="white" onClick={() => setShow(false)}/>

    </Offcanvas.Header>
    <Offcanvas.Body>
      <Nav className="justify-content-end flex-grow-1 pe-3">
        <Nav.Link href="/" className="link">Home</Nav.Link>
        { profile !== null && (
          <Nav.Link href="/profile" className="link">Profile</Nav.Link>
        )}
        { profile !== null &&  profile.isAdmin && (
          <Nav.Link href="/admindashboard" className="link">Admin Dashboard</Nav.Link>
        )}
        { profile === null ? (
          <Nav.Link href="/login" className="link">Login</Nav.Link>
        ) : (
          <Nav.Link
          className="link"
            onClick={async () => {
              setShow(false);
               logOut();
              navigate("/login");
            }}
          >
            Logout
          </Nav.Link>
        )}
       
      </Nav>
    </Offcanvas.Body>
  </Navbar.Offcanvas>
</Container>
</Navbar>

      )}
      
    </AppContext.Consumer>
  );
}
