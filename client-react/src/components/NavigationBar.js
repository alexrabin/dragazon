import React, { useState, useEffect } from 'react'
import {Navbar, Container, Nav, NavDropdown, Offcanvas} from 'react-bootstrap'
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';
export default function NavigationBar() {
  const [profile, setProfile] = useState(null)
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
    useEffect(() => {
        
        async function fetchProfile() {
            let user = await authService.getLoggedInUser();
            if (user.response){
              setProfile(user.response.data);
            }
            else if (user.error){
              setProfile(null);
            }
        }
        fetchProfile();
    }, [])

    return (
        <div>
            
            <Navbar bg="light" expand={false}>
              <Container fluid>
                <Navbar.Brand href="/">Dragazon</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={()=> setShow(true)}/>
                <Navbar.Offcanvas
                  show={show}
                  onHide={() => setShow(false)}
                  id="offcanvasNavbar"
                  aria-labelledby="offcanvasNavbarLabel"
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Dragazon</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="/">Home</Nav.Link>
                      {profile !== null && <Nav.Link href="/profile">Profile</Nav.Link>}
                      {profile === null ? <Nav.Link href="/login">Login</Nav.Link>: <Nav.Link onClick={async ()=> {
                        setShow(false);
                        await authService.logout(); 
                        setProfile(null);
                        navigate('/login')
                        }}>Logout</Nav.Link>}
                      <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                          Something else here
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
</Navbar>

        </div>
    )
}
