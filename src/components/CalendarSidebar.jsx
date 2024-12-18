import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


const CalendarSidebar = ({ onDateSelect }) => {
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

    // Handles going to today and showing today's events
    const handleToday = () => {
        let calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.today();
            const today = new Date().toISOString().split('T')[0];
            setSelectedDate(today);
            onDateSelect(today);  // Trigger event details update for today
        }
    };

    // Handles manual date selection
    const handleDateChange = (e) => {
        const selected = e.target.value;
        setSelectedDate(selected);
        onDateSelect(selected);
    };

    // Handles clicking a date on the calendar
    const handleDateClick = (info) => {
        const clickedDate = info.dateStr;
        setSelectedDate(clickedDate);
        onDateSelect(clickedDate);
    };

    return (
        <div>
            <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" fill="currentColor" class="bi bi-calendar2-event" viewBox="0 0 16 16">
            <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"/>
            </svg>𝑪𝜟𝑳𝜮𝜫𝑫𝜟𝜞</h4>
            <div className="calendar-controls mb-3">
                {/* Today button */}
                <button className="btn btn-secondary" onClick={handleToday}>Today</button>
                
                {/* Manual date input field */}
                <input type="date" className="form-control mt-2" value={selectedDate} onChange={handleDateChange} />
            </div>
            
            {/* FullCalendar instance */}
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}  // Now using fetched events
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next', 
                    center: 'title',
                    right: ''
                }}
            />
        </div>
    );
};

export default CalendarSidebar;
