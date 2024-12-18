import React, { useState, useEffect } from 'react';

const EventDetails = ({ selectedDate, onDateChange }) => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        // Fetch events from the API
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/events');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        // Filter events by selected date
        const matchingEvents = events.filter(event => {
            const eventDate = event.start.split('T')[0];
            return eventDate === selectedDate;
        });
        setFilteredEvents(matchingEvents);
    }, [events, selectedDate]);

    const handlePrev = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(prevDate.getDate() - 1);
        onDateChange(prevDate.toISOString().split('T')[0]);
    };

    const handleNext = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        onDateChange(nextDate.toISOString().split('T')[0]);
    };

    return (
        <div>
            <h2><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
            </svg>𝜮𝝂𝜺𝜼𝝉 𝑫𝜮𝜯𝜟𝜤𝑳𝑺</h2>
            <div id="event-details" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#ffffff', height: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <div key={index}>
                            <h3>{event.title}</h3>
                            <p><strong>Date Start: </strong>{new Date(event.start).toLocaleDateString()}</p>
                            <p><strong>Date End: </strong>{event.end ? new Date(event.end).toLocaleDateString() : 'N/A'}</p>
                            <p><strong>Location: </strong>{event.extendedProps?.location || 'N/A'}</p>
                            <p><strong>Description: </strong>{event.extendedProps?.description || 'N/A'}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No events for this date</p>
                )}
            </div>
            <button className="btn btn-dark" onClick={handlePrev}>Previous Day</button>
            <button className="btn btn-dark" onClick={handleNext}>Next Day</button>
        </div>
    );
};

export default EventDetails;
