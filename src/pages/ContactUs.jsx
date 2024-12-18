import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const ContactUs = () => {
    const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [emailError, setEmailError] = useState(''); // To store email validation error
    const [isLoading, setIsLoading] = useState(false); // Loading state for the button

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // General format check
        if (!emailRegex.test(email)) {
            return false;
        }

        // Prevent multiple `.com.com` type entries
        const domainPart = email.split('@')[1];
        if (domainPart && domainPart.split('.').length > 2) {
            return false; // Invalid if more than one `.` in domain part
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate email
        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setEmailError(''); // Clear error if email is valid
        setIsLoading(true); // Start loading state

        try {
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Show the thank you modal
                setShowThankYouModal(true);
                // Reset the form data
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                alert('Failed to submit contact details');
            }
        } catch (error) {
            console.error('Error submitting contact details:', error);
        } finally {
            setIsLoading(false); // Stop loading state after response
        }
    };

    const handleClose = () => setShowThankYouModal(false);

    return (
        <>
            {/* Contact Section */}
            <section id="contact" className="p-4 bg-light border-top">
                <h2 className="bg-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                    </svg>
                </h2>
                <h2>Contact Us</h2>
                <p>If you want a volunteer for our events, please contact us or submit your details, and we will get in touch with you.</p>
                <p>We work only with genuine companies.</p>
                
                {/* Contact Form */}
                <Form id="contactForm" onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            placeholder="Your Name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            required 
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            isInvalid={!!emailError} // Show error styling if email is invalid
                            required 
                        />
                        {/* Show email error message */}
                        {emailError && <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>}
                    </Form.Group>
                    
                    <Form.Group controlId="formMessage">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            name="message"
                            rows={4} 
                            placeholder="Your Message" 
                            value={formData.message}
                            onChange={handleInputChange}
                            required 
                        />
                    </Form.Group>
                    
                    <Button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </Button>
                </Form>
                
                {/* Contact Details */}
                <div className="contact-details mt-3">
                    <p>Email: <a href="mailto:anuragdubey23004@gmail.com">anuragdubey23004@gmail.com</a></p>
                    <p>Phone: +91 91528-05940</p>
                </div>
            </section>
            
            {/* Thank You Modal */}
            <Modal show={showThankYouModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thank You!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thank you for your message! We will get back to you soon.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ContactUs;
