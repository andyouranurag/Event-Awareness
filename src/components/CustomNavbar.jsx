import React, { useState, useEffect } from 'react';  
import { Navbar, Nav, Offcanvas, Form, FormControl } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { FaBars } from 'react-icons/fa';
import Login from './Login';
import Signup from './Signup';
import AdminLogin from './AdminLogin'; 

const CustomNavbar = ({ events }) => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);  
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredEvents, setFilteredEvents] = useState([]); 
    const [navbarColor, setNavbarColor] = useState('transparent'); // State for navbar color

    const location = useLocation(); // Use useLocation to get the current path

    const handleLoginClose = () => setShowLogin(false);
    const handleSignupClose = () => setShowSignup(false);
    const handleAdminLoginClose = () => setShowAdminLogin(false);

    const handleOffcanvasClose = () => setShowOffcanvas(false);
    const handleOffcanvasShow = () => setShowOffcanvas(true);  

    const handleContactClick = () => {
        const element = document.getElementById('contact-details');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Function to handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter events based on search query
        if (query) {
            const filtered = events.filter(event => {
                const title = event.title ? event.title.toLowerCase() : '';  
                const description = event.description ? event.description.toLowerCase() : '';
                const eventDate = event.date ? new Date(event.date).toLocaleDateString() : ''; // Convert date to string format
                return title.includes(query) || description.includes(query) || eventDate.includes(query); // Include date in search
            });
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents([]); 
        }
    };

    // Scroll event listener to change navbar color
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarColor('#'); // Change to black when scrolled
            } else {
                setNavbarColor('transparent'); // Keep transparent at top
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Cleanup on component unmount
        };
    }, []);

    // Function to handle Home click to prevent reload if already on Home
    const handleHomeClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault(); // Prevent page refresh if already on the homepage
        }
    };

    return (
        <>
            <Navbar 
                className="navbar" 
                expand="lg" 
                style={{ 
                    backgroundColor: navbarColor, 
                    transition: 'background-color 0.3s ease', 
                    position: 'sticky', 
                    top: 0, 
                    zIndex: 1000 
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaBars onClick={handleOffcanvasShow} style={{ cursor: 'pointer', color: '#050404', fontSize: '24px' }} />
                </div>

                <Navbar.Brand className="mx-auto" style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <Link to="/" style={{ color: '#050404', textDecoration: 'none' }}><strong>𝜮𝝂𝜺𝜼𝝉 𝑺𝜽𝜾𝝁𝝉𝒊𝜽𝜼</strong></Link>
                </Navbar.Brand>

                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <Form className="d-flex" style={{ marginRight: '16px', border: '1px solid black' }}>
                        <FormControl
                            type="search"
                            placeholder="Search Events"
                            className="mr-2"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearchChange} 
                        />
                    </Form>

                    {filteredEvents.length > 0 && (
                        <ul className="list-group" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000, width: '100%', backgroundColor: 'white' }}>
                            {filteredEvents.map((event, index) => (
                                <li key={index} className="list-group-item">
                                    <Link to={`/events/${event.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <div>
                                            <strong>{event.title}</strong> <br />
                                            <small>{new Date(event.start).toLocaleDateString()}</small> {/* Display event date */}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <Nav>
                        <Nav.Link onClick={() => setShowLogin(true)} style={{ color: '#050404', fontWeight: 'bold', border: '1px solid black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                        </svg> Login</Nav.Link>
                        <Nav.Link onClick={() => setShowSignup(true)} style={{ color: '#050404', fontWeight: 'bold', border: '1px solid black' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"/>
                        <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg> SignUp</Nav.Link>
                    </Nav>
                </div>
            </Navbar>

            {/* Offcanvas Menu */}
            <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="start" style={{ width: '200px' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" onClick={handleHomeClick}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/MyEvents">My Events</Nav.Link>
                        <Nav.Link as={Link} to="/PastEvents">Past Events</Nav.Link>
                        <Nav.Link onClick={handleContactClick}>Contact Us</Nav.Link>
                        <Nav.Link onClick={() => setShowAdminLogin(true)}>Admin Login</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Modals for Login, Signup, and AdminLogin */}
            <Login show={showLogin} handleClose={handleLoginClose} onLoginSuccess={() => alert('Logged in successfully')} />
            <Signup show={showSignup} handleClose={handleSignupClose} />
            <AdminLogin show={showAdminLogin} handleClose={handleAdminLoginClose} onLoginSuccess={() => alert('Admin logged in successfully')} />
        </>
    );
};

export default CustomNavbar;
