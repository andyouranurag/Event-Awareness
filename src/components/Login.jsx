import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const Login = ({ show, handleClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('/api/login', { email, password });
            if (response.data.success) {
                onLoginSuccess();
                handleClose(); // Close modal on success
            } else {
                setError(response.data.message || 'Login failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleForgotPassword = () => {
        // Logic for handling forgot password can go here.
        // You could either redirect to a reset page or show another modal.
        alert("Redirecting to forgot password page...");
        // Example: window.location.href = '/forgot-password'; // If you have a separate page for it.
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="loginEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="loginEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <button type="submit" className="btn btn-primary">Login</button>

                    {/* Forgot password link */}
                    <div className="mt-3">
                        <a href="#!" onClick={handleForgotPassword}>Forgot Password?</a>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Login;
