import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (date) => {
    const isoDate = date.toISOString().split("T")[0];
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/events?date=${isoDate}`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    }
    setLoading(false);
  };

  const handleDateClick = (date) => {
    
    setSelectedDate(date);
    fetchEvents(date);
  };

  return (
    
    <div className="mycalendar">
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
        <Calendar onClickDay={handleDateClick} value={selectedDate} />

        <div style={{ marginTop: "20px" }}>
          <h3>Events on {selectedDate.toDateString()}</h3>
          {loading ? (
            <p>Loading...</p>
          ) : events.length > 0 ? (
            <ul>
              {events.map((event, idx) => (
                <li key={idx}>{event.title || event.note}</li>
              ))}
            </ul>
          ) : (
            <p>No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
