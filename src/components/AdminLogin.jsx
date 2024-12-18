import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ show, handleClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear any previous error
    
        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token); // Store the token
                onLoginSuccess(); // Notify App of successful login
    
                // Open the events page in a new tab
                window.open('/admin/events', '_blank');
    
                // Optionally remove this navigate if you don't want to redirect in the current tab
                // navigate('/admin/events'); 
                
                handleClose(); // Close modal
                setUsername(''); // Clear username field
                setPassword(''); // Clear password field
            } else {
                setError(response.data.message || 'Login failed.');
            }
        } catch (err) {
            console.error('Login error:', err); // Log error for debugging
            setError('An error occurred. Please try again.');
        }
    };
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Admin Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="adminUsername">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="adminUsername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter admin username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adminPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="adminPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Button type="submit" className="btn btn-primary">Login</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AdminLogin;
