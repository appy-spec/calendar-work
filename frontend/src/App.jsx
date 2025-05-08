import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Titleapage from "./TitlePage";

import Historypage from "./Historypage";
import Homepage from "./Homepage";
import Viewpage from "./Viewpage";

function App() {
  return (
    <>
      <div style={{ width: "100%", height: "100%", padding: "2.5%",border: "2px solid grey" }}>
        <Titleapage />
        <div style={{ border: "2px solid grey", padding: "2.3%" }}>
          <Navbar />
          <div style={{ backgroundColor: "deepgreen", padding: "2%" }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/history" element={<Historypage />} />
              <Route path="/viewtrends" element={<Viewpage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
