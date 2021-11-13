import React, { useState, useEffect } from 'react'
import {Col, Container, Row, Placeholder, Card, Form} from 'react-bootstrap'
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';
export default function ProfilePage() {
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        
        async function fetchProfile() {
            let user = await authService.getLoggedInUser();
            if (user.error){
                navigate('/login');
            }
            setProfile(user.response.data);
        }
        fetchProfile();
    }, [])
    return (
        <Container className="mt-5 mb-5">
            <h1 className="mb-4 text-center">Profile</h1>
            {profile && <><Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={profile.name} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control value={profile.email} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control value={profile.username} disabled />
            </Form.Group></>}
            
        </Container>
    )
}
