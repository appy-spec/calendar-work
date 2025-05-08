import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Addmood({ getWeather }) {

  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");

  // to get today date in proper formate

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const moods = ["happy", "sad", "jolly", "awesome", "excited"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood || !note) {
      alert("Please select a mood and enter a note");
      return;
    }

    let formData = {
      note: note,
      mood: selectedMood,
      date: formattedDate,
      temp: getWeather.temperature || 0,
    };

    // request to server to add the data into our mongodb

    axios
      .post("http://localhost:3000/addnote", formData)
      .then((res) => {
        
        if (res) {
          
          // Show success toast
          toast.success("Note added successfully!");

          setSelectedMood("");
          setNote("");
        }
      })
      .catch((err) => {
        
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h3>Add your today Mood</h3>
        <p>{formattedDate}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="homepagecard">
          {moods.map((mood) => (
            <div
              key={mood}
              className={`card ${selectedMood === mood ? "selected" : ""}`}
              onClick={() => setSelectedMood(mood)}
              style={{
                cursor: "pointer",
                border:
                  selectedMood === mood ? "2px solid blue" : "1px solid #ccc",
                padding: "1em",
                margin: "0.5em",
                borderRadius: "5px",
              }}
            >
              {mood}
            </div>
          ))}
        </div>

        <div>
          <textarea
            style={{ width: "96.2%", height: "5em", marginTop: "1.8vw" }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div style={{marginTop:"1.5vw"}}>
          <button className="button" type="submit">
            Add Mood
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Addmood;
