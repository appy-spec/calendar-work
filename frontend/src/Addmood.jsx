import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Addmood() {
  
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");

  const moods = ["happy", "sad", "jolly", "awesome", "excited"];

  const handleSubmit = (e) => {

    e.preventDefault();
    if (!selectedMood || !note) {

      alert("Please select a mood and enter a note");
      return;
    }

    // Do something with the data (e.g., send to server)
    console.log("Mood:", selectedMood);
    console.log("Note:", note);

    setSelectedMood("");
    setNote("");

    // Show success toast
    toast.success("Mood added successfully!");
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
            style={{ width: "96.2%", height: "5em", marginTop: "2vw" }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div>
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
