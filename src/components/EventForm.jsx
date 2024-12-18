import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './EventForm.css'; // Import CSS for styling

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null); // To store the event ID for editing
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch all events when the page loads
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleAddOrUpdateEvent = async (e) => {
        e.preventDefault();

        if (!title || !start || !end || !location || !description) {
            setError('Please fill all fields');
            return;
        }

        try {
            const newEvent = { title, start, end, extendedProps: { location, description } };
            
            if (isEditing) {
                // Update the event if in edit mode
                await axios.put(`http://localhost:5000/events/${currentEventId}`, newEvent, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setEvents(events.map((event) => 
                    event._id === currentEventId ? { ...newEvent, _id: currentEventId } : event
            ));
            } else {
                // Add a new event
                await axios.post('http://localhost:5000/events', newEvent, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setEvents([...events, newEvent]);
            }

            // Clear form fields
            setTitle('');
            setStart('');
            setEnd('');
            setLocation('');
            setDescription('');
        } catch (err) {
            setError('Failed to add/update event');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5000/events/${eventId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEvents(events.filter((event) => event._id !== eventId));
        } catch (err) {
            setError('Failed to delete event');
        }
    };

    const handleEditEvent = (event) => {
        // Populate form with selected event data for editing
        setTitle(event.title);
        setStart(event.start);
        setEnd(event.end);
        setLocation(event.extendedProps.location);
        setDescription(event.extendedProps.description);
        setIsEditing(true);
        setCurrentEventId(event._id); // Store the ID of the event being edited
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        // Redirect to the previous page
        window.history.back();

        // Try to close the current tab (will only work if the tab was opened with window.open)
        window.close();
    };

    return (
        <div className="event-form-container">
            <h2 className="form-title">Event Management</h2>

            <div className="event-form">
                <h3>{isEditing ? 'Update Event' : 'Add Event'}</h3>
                <form onSubmit={handleAddOrUpdateEvent}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? 'Update Event' : 'Add Event'}
                    </button>
                </form>
            </div>

            <div className="event-list">
                <h3>All Events</h3>
                <div className="event-list-container">
                    <ul>
                        {events.map((event) => (
                            <li key={event._id} className="event-item">
                                <div>
                                    <strong>{event.title}</strong> - {event.start} to {event.end}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEditEvent(event)}
                                        className="btn btn-secondary"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteEvent(event._id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
             {/* Logout Button */}
             <button onClick={handleLogout} className="btn btn-danger logout-btn">
                Logout
            </button>
        </div>
    );
};

export default EventForm;
