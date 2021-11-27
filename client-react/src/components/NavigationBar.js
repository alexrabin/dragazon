import React, { useState} from "react";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  CloseButton,
  Badge,
  Button
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dragazonlogoLight.png";
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import AppContext from './AppContext';
import './NavigationBar.css';



export default function NavigationBar() {
  const [showNavList, setShowNavList] = useState(false);
  const [showCart, setShowCart] = useState(false);

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
const getReadablePrice = (price) => {
  var dollars = price / 100;
  dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
  return dollars;
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
  {profile !== null && <Navbar.Toggle aria-controls="cartOffCanvas" style={{marginRight:10}} className="text-white col-auto"      onClick={() => setShowCart(true)}

>
    <div className="row jusitfy-content-between align-items-center ">
      <FaShoppingCart className="col-auto"/>
      <Badge pill bg="danger" className="col-auto" style={{fontSize:11}}>
        {getTotalAmountOfProducts(cart)}
      </Badge>
    </div>
  </Navbar.Toggle>}
    <Navbar.Toggle
      className="text-white col-auto"
      aria-controls="offcanvasNavbar"
      onClick={() => setShowNavList(true)}
    >
      <FaBars/>
      </Navbar.Toggle>
  </div>
  <Navbar.Offcanvas
    show={showNavList}
    onHide={() => setShowNavList(false)}
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
      <CloseButton variant="white" onClick={() => setShowNavList(false)}/>

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
              setShowNavList(false);
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
  <Navbar.Offcanvas
    show={showCart}
    onHide={() => setShowCart(false)}
    id="cartOffCanvas"
    aria-labelledby="offcanvasCartLabel"
    placement="end"
    className="bg-dark"
    bg="dark" variant="dark"
  >
    <Offcanvas.Header >
      <Offcanvas.Title id="offcanvasCartLabel">
      <h1 className="text-white" style={{marginTop:0}}>Cart</h1>

      </Offcanvas.Title>
      <CloseButton variant="white" onClick={() => setShowCart(false)}/>

    </Offcanvas.Header>
    <Offcanvas.Body>
      {cart.products && cart.products.map((p, key) => {
        return <div key={key}>
              <div className="text-white">
              <div className="mb-3">
                  <img alt={`${p.product.title}`} src={p.product.img} style={{width:200, }} className=""/>
                  </div>
                  <div className="">
                  <p>
                      {p.product.title} {p.quantity > 1 && `× ${p.quantity}`}
                  </p>
                  <p>
                      {getReadablePrice(p.quantity * p.product.price)}
                  </p>
                  </div>
                  
              </div>
              <hr className="solid text-white"/>

          </div>
      })}
      <h3 className="text-white">Total: {getReadablePrice(cart.totalPrice)}</h3>
      <Button
            variant="danger"
            type="button"
            style={{
              paddingRight: 50,
              paddingLeft: 50,
              borderRadius: "1% 25% / 80% ",
              color:"ivory",
              fontWeight:"700",
            }}
            disabled={cart.products==0}
          >
            Checkout
          </Button>
    </Offcanvas.Body>
  </Navbar.Offcanvas>
</Container>
</Navbar>

      )}
      
    </AppContext.Consumer>
  );
}
