import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import CustomNavbar from './components/CustomNavbar';
import CalendarSidebar from './components/CalendarSidebar';
import EventDetails from './components/EventDetails';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import MyEvents from './pages/MyEvents';
import PastEvents from './pages/PastEvents';
import EventForm from './components/EventForm'; // Add EventForm for admins
import AdminLogin from './components/AdminLogin'; // Add AdminLogin component
import './App.css';
import et from './images/EVENTS.png';
import Spin from './components/spinner';

function App() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [events, setEvents] = useState([]);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/events');
                if (!response.ok) throw new Error('Failed to fetch events');
                
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAdminLoggedIn(true);
        }
    }, []);

    const handleDateSelect = (date) => setSelectedDate(date);

    const handleAdminLoginSuccess = () => setIsAdminLoggedIn(true);

    return (
        <Router>
            <Routes>
                {/* Admin Routes */}
                {isAdminLoggedIn && (
                    <>
                        <Route 
                            path="/admin/events" 
                            element={<EventForm />} 
                        />
                    </>
                )}

                <Route 
                    path="/admin/login" 
                    element={<AdminLogin onLoginSuccess={handleAdminLoginSuccess} />} 
                />

                {/* Main Routes */}
                <Route
                    path="/my-events"
                    element={<MyEvents />}
                />
                <Route
                    path="/past-events"
                    element={<PastEvents />}
                />

                <Route
                    path="*"
                    element={
                        <>
                        <CustomNavbar events={events} />
                            {/* Navbar and Header Image */}
                            <div className="image-container">
                            
                                <Image src={et} fluid />
                            </div>

                            {/* Main Page Content */}
                            <div className="container mt-4">
                                <div className="row">
                                    <div className="col-md-8 mb-4">
                                        <EventDetails 
                                            events={events} 
                                            selectedDate={selectedDate} 
                                            onDateChange={handleDateSelect} 
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <CalendarSidebar 
                                            events={events} 
                                            onDateSelect={handleDateSelect} 
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px' , marginBottom: '10px'}}>
                                <Spin/>
                                </div>

                                {/* Spinner or Carousel */}
                                {loading ? <Spin /> : <Carousel />}
                                

                                {/* Contact Section */}
                                <section id="contact-details"style={{ marginTop: '10px' }}>
                                    <ContactUs />
                                </section>
                            </div>

                            {/* Footer */}
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
