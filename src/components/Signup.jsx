import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Signup = ({ show, handleClose }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [experience, setExperience] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photos, setPhotos] = useState([]); // State for storing uploaded photos
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

    const validatePassword = (password) => {
        const passwordValid = /[A-Z]/.test(password) &&
                              /[a-z]/.test(password) &&
                              /\d/.test(password) &&
                              /[!@#$%^&*]/.test(password) &&
                              password.length >= 8;
        return passwordValid ? '' : 'Password must be at least 8 characters and contain a combination of uppercase, lowercase, number, and special character.';
    };

    const handleFileChange = (e) => {
        setPhotos(e.target.files); // Update photos with the selected files
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setPasswordStrength('');

        if (age < 18 || age > 70) {
            setError('Age must be between 18 and 70.');
            return;
        }

        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setPasswordStrength(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('mobile', mobile);
        formData.append('email', email);
        formData.append('experience', experience);
        formData.append('password', password);
        
        // Append files to the FormData object
        for (let i = 0; i < photos.length; i++) {
            formData.append('photos', photos[i]);
        }

        try {
            const response = await axios.post('/api/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                alert('Signup successful');
                handleClose();
            } else {
                setError(response.data.message || 'Signup failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="signupName">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="signupName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="signupAge">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="signupAge"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter age"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="signupMobile">Mobile no.</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="signupMobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Whatsapp Preferable"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="signupEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="signupEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="signupExperience">Experiences</label>
                        <input
                            type="text"
                            className="form-control"
                            id="signupExperience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="Write event type"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="signupPassword">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle input type
                                className="form-control"
                                id="signupPassword"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordStrength(validatePassword(e.target.value));
                                }}
                                placeholder="Password"
                                required
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
                                </span>
                            </div>
                        </div>
                        {passwordStrength && <div className="form-text text-danger">{passwordStrength}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Re-enter Password</label>
                        <div className="input-group">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'} // Toggle input type for confirm password
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter password"
                                required
                            />
                        </div>
                    </div>

                    {/* File upload field */}
                    <div className="form-group">
                        <label>Upload your 2 to 3 good looking photos</label>
                        <Form.Control type="file" multiple onChange={handleFileChange} />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    <Button type="submit" className="btn btn-primary">Sign Up</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Signup;
