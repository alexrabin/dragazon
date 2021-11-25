import React, { useState, useRef } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";
import "./LoginPage.css";
import head from "../assets/textheaderligred.png";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    if (showLogin) {
      //handle login flow
      let username = usernameInput.current.value;
      let password = passwordInput.current.value;

      const result = await authService.login(username, password);
      if (result.response) {
        if (result.response.data === "Login successful") {
          navigate("/profile");
          window.location.reload(true);
        }
      } else {
        setErrorMsg(result.error);
      }
    } else {
      //handle sign up flow
      let name = nameInput.current.value;
      let email = emailInput.current.value;
      let username = usernameInput.current.value;
      let password = passwordInput.current.value;

      const result = await authService.signUp(name, email, username, password);
      if (result.response) {
        console.log(result.response.data);
        if (result.response.data.message === "User created") {
          navigate("/profile");
          window.location.reload(true);
        }
      } else {
        setErrorMsg(result.error);
      }
    }
  };
  const reset = () => {
    if (nameInput.current !== null) nameInput.current.value = "";
    if (emailInput.current !== null) emailInput.current.value = "";
    if (usernameInput.current !== null) usernameInput.current.value = "";
    if (passwordInput.current !== null) passwordInput.current.value = "";

    setErrorMsg(null);
  };
  return (
   
    <Container className="col-md-10 mx-auto col-lg-10 col-xl-6" style={{color: 'ivory'}}>
 <img
        className="d-block w-100"
        src={head}
        style={{ objectFit: "contain" }}
      />
      <Form
        className="col-md-6 mb-5 mx-auto mt-3"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >  
      
        <h1 className="text-center" style={{color: 'rgb(170,1,20)', fontFamily: 'cursive'}}>{showLogin ? "Login" : "Sign Up"}</h1>

        {!showLogin && (
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={nameInput}
              type="text"
              placeholder="Name"
              required
            />
          </Form.Group>
        )}
        {!showLogin && (
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={emailInput}
              type="email"
              placeholder="Email"
              required
              isInvalid={errorMsg && errorMsg.includes("The email")}
            />
            <Form.Control.Feedback type="invalid">
              {errorMsg}
            </Form.Control.Feedback>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <FormControl
              ref={usernameInput}
              required
              type="text"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              isInvalid={
                errorMsg && errorMsg.toLowerCase().includes("username")
              }
            />
            <Form.Control.Feedback type="invalid">
              {errorMsg}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordInput}
            required
            type="password"
            placeholder="Password"
            isInvalid={errorMsg === "Wrong password"}
          />
          <Form.Control.Feedback type="invalid">
            Incorrect Password
          </Form.Control.Feedback>
        </Form.Group>

        {errorMsg === "network error" && (
          <p className="text-danger text-center">Could not connect to server</p>
        )}
        <div className="text-center">
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
          >
            {showLogin ? "Login" : "Sign Up"}
          </Button>
        </div>
        {/* </Form> */}
        <div className="text-center mt-4">
          {showLogin ? (
            <p>
              Don't have an account?{" "}
              <button
               className="text-danger"
               type="button"

                onClick={() => {
                  reset();
                  setShowLogin(!showLogin);
                }}
              >
                Sign up here
              </button>
              .
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                className="text-danger"
                type="button"
                onClick={() => {
                  reset();
                  setShowLogin(!showLogin);
                }}
              >
                Login here
              </button>
              .
            </p>
          )}
        </div>
      </Form>
    </Container>
  );
}
