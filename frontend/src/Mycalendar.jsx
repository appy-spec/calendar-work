import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const Mycalendar = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3000/allnotes')
      .then((res) =>  setAllEvents(res.data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  const fetchEvents = async (date) => {
    setLoading(true);

    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    try {
      const res = await axios.post("http://localhost:3000/viewnotes", {
        formattedDate,
      });

      // Make sure response is an array
      const data = Array.isArray(res.data) ? res.data : [res.data];
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
        <Calendar onClickDay={handleDateClick} value={selectedDate} 
         tileClassName={({ date, view }) => {
          if (view === 'month') {
            const hasData = allEvents.some((event) => {
              const eventDate = new Date(event.date).toDateString();
              const tileDate = date.toDateString();
              return eventDate === tileDate;
            });
            return hasData ? 'has-event' : null;
          }
        }}
        />
      </div>
      <div className="shownotes">
        <div style={{ marginTop: "20px" }}>
          <h3 style={{marginBottom:"1.5vw"}}>Notes on {selectedDate.toDateString()}</h3>
          {loading ? (
            <p>Loading...</p>
          ) : events.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {events.map((event, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    width: "200px",
                  }}
                >
                  <p>
                    <strong>Mood:</strong> {event.mood}
                  </p>
                  <p>
                    <strong>Note:</strong> {event.note}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No notes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mycalendar;
