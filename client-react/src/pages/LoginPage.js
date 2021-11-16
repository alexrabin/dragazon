import React, {useState, useRef}from 'react'
import {Button, Container, Form, InputGroup, FormControl} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

export default function LoginPage() {
    const [showLogin, setShowLogin] = useState(true)
    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    const submitHandler = async (e)=> {
        e.preventDefault();

        

        if (showLogin){
            //handle login flow
            let username = usernameInput.current.value;
            let password = passwordInput.current.value;

            const result = await authService.login(username, password);
            if (result.response){
                if (result.response.data === "Login successful"){
                    navigate('/profile');
                    window.location.reload(true);
                }
            }
            else {
                setErrorMsg(result.error)
            }
        }
        else {
            //handle sign up flow
            let name = nameInput.current.value;
            let email = emailInput.current.value;
            let username = usernameInput.current.value;
            let password = passwordInput.current.value;
            
            const result = await authService.signUp(name, email,username, password);
            if (result.response){
                console.log(result.response.data);
                if (result.response.data.message === "User created"){
                    navigate('/profile');
                    window.location.reload(true);
                }
            }
            else {
                setErrorMsg(result.error)
            }

        }
    }
    const reset = () => {
        if (nameInput.current !== null)
        nameInput.current.value = "";
        if (emailInput.current !== null)
        emailInput.current.value = "";
        if (usernameInput.current !== null)
        usernameInput.current.value = "";
        if (passwordInput.current !== null)
        passwordInput.current.value = "";

        setErrorMsg(null);
    }
    return (
        <Container  className="mt-5 mb-5 mx-auto">
            <h1 className="text-center">{showLogin ? "Login":"Sign Up"}</h1>
            
            <Form className="mt-5 mb-5 mx-auto" onSubmit={e => {
                submitHandler(e);
            }}>
            {!showLogin && 
                <Form.Group className = 'mb-3' controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameInput} type="text" placeholder="Name" required/>
                </Form.Group>
            }
                {!showLogin && 
                <Form.Group className = 'mb-3' controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailInput} type="email" placeholder="Email" required isInvalid={errorMsg && errorMsg.includes("The email")}/>
                    <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>

                </Form.Group>
            }
                <Form.Group className = 'mb-3' controlId="username">
                    <Form.Label>Username</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                        ref= {usernameInput}
                        required
                        type="text"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        isInvalid={errorMsg && errorMsg.toLowerCase().includes("username")}
                        />
                        <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
                    </InputGroup>

                </Form.Group>
                <Form.Group className = 'mb-3' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordInput} required type="password" placeholder="Password" isInvalid={errorMsg === "Wrong password"}/>
                    <Form.Control.Feedback type="invalid">Incorrect Password</Form.Control.Feedback>
                </Form.Group>

                {errorMsg === "network error" && <p className="text-danger text-center">Could not connect to server</p>}
                <div className="text-center">
                <Button variant="primary" type="submit" style={{paddingRight:50, paddingLeft:50}}>
                    {showLogin ? "Login":"Sign Up"}
                </Button>
                </div>
            </Form>
            <div className="text-center">
            {showLogin ? <p>Don't have an account? <a style={{color:'blue', cursor:'pointer'}} onClick={() => {
                reset()
                setShowLogin(!showLogin);
            }}>Sign up here</a>.</p> : 
            <p>Already have an account? <a style={{color:'blue', cursor:'pointer'}} onClick={() => {
                reset()
                setShowLogin(!showLogin);
            }}>Login here</a>.</p>}
            </div>
        </Container>
    )
}
