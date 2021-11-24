import React, { useState, useEffect, useCallback } from "react";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  CloseButton
} from "react-bootstrap";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dragazonlogoLight.png";

import './NavigationBar.css';



export default function NavigationBar() {
  const [profile, setProfile] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    let user = await authService.getLoggedInUser();
    if (user.response) {
      setProfile(user.response.data);
    } else if (user.error) {
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand={false}>
        <Container fluid>
         
          <Navbar.Brand>
            <a href="/">
              <img alt="Dragazon Logo" src={logo} style={{ width: 140, marginTop: 0}}></img>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle
            className="text-white"
            aria-controls="offcanvasNavbar"
            onClick={() => setShow(true)}
          />
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
                {profile !== null && (
                  <Nav.Link href="/profile" className="link">Profile</Nav.Link>
                )}
                {profile !== null && profile.isAdmin && (
                  <Nav.Link href="/admindashboard" className="link">Admin Dashboard</Nav.Link>
                )}
                {profile === null ? (
                  <Nav.Link href="/login" className="link">Login</Nav.Link>
                ) : (
                  <Nav.Link
                  className="link"
                    onClick={async () => {
                      setShow(false);
                      await authService.logout();
                      setProfile(null);
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
    </div>
  );
}
