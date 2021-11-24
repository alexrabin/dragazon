import React, { useContext } from 'react';
import { Container,Form} from 'react-bootstrap';
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import AppContext from '../components/AppContext';

export default function ProfilePage() {
    // const [profile, setProfile] = useState(null)

    // const {profile } = useContext(AppContext);
    return (
        <AppContext.Consumer>
            {({profile, cart, logOut}) => (
        <Container className="mt-5 mb-5" style={{color: 'ivory'}}>
            <h1 className="mb-4 text-center" style={{color: 'rgb(170,1,20)'}}>Profile</h1>
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
            </Form.Group>
            {profile.isAdmin && <Form.Group className="mb-3">
                <Form.Label>Admin</Form.Label>
                <Form.Control value={profile.isAdmin} disabled />
            </Form.Group>}
            </>
            
            }
            
            
        </Container>
            )}
        </AppContext.Consumer>
    )
}
