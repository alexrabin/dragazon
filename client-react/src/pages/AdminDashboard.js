import React, { useState, useEffect, useCallback } from 'react'
import { Container, Form, Accordion, Button, ButtonGroup} from 'react-bootstrap'
import authService from '../services/auth';
import adminService from '../services/admin';

import { useNavigate } from 'react-router-dom';
export default function AdminDashboardPage() {
    const [profile, setProfile] = useState(null)
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    const fetchAllUsers = async () => {
        let allUsers = await adminService.getAllUsers();
            if (allUsers.error){
                setAllUsers("Could not load users");
            }
            else{
                setAllUsers(allUsers.response.data);
            }
    }
    const fetchProfile = useCallback(async () => {
        let user = await authService.getLoggedInUser();
            if (user.error){
                navigate('/login');
                return
            }
            if (!user.response.data.isAdmin){
                navigate('/');
                return
            }
            fetchAllUsers();
            setProfile(user.response.data);

      }, [navigate])

    useEffect(() => {
    
        fetchProfile();
    }, [fetchProfile])

    const makeUserAdmin = async (userID) => {
        let makeAdmin = await adminService.makeUserAdmin(userID);
        if (makeAdmin.error){
            // setAllUsers("Could not load users");
        }
        else{
            fetchAllUsers();

        }
    }

    const deleteUser = async (userID) => {
        let deleteUser = await adminService.deleteUser(userID);
        if (deleteUser.error){
            console.log(deleteUser.error)
            // setAllUsers("Could not load users");
        }
        else{
            fetchAllUsers();

        }
    }
    return (
        <Container className="mt-5 mb-5">
            <h1 className="mb-4">Admin Dashboard</h1>
            {profile && <>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Users</Accordion.Header>
                        <Accordion.Body>
                        {allUsers === "Could not load users" ? <p>{allUsers}</p> : 
                        allUsers.map((user, key) => {
                            return <div key={key}>

                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                    <Accordion.Header>{user.name}</Accordion.Header>
                                    <Accordion.Body>

                                    <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={user.name} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control value={user._id} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control value={user.email} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control value={user.username} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Admin</Form.Label>
                                        <Form.Control value={user.isAdmin} disabled />
                                    </Form.Group>

                                    <ButtonGroup aria-label="Admin Actions">
                                        {!user.isAdmin && <Button variant="primary" onClick={() => makeUserAdmin(user._id)}>Make Admin</Button>}
                                        <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete</Button>
                                        </ButtonGroup>

                                    
                                    </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                
                                </div>
                        })
                        }
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Orders</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
            </>
            
            }
            
            
        </Container>
    )
}
