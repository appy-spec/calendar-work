import React, { useState, useEffect } from "react";
import Viewtrend from "./Viewtrend";
import axios from "axios";

function Viewpage() {

  let [allNotes, setAllNotes] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:3000/allnotes")
      .then((res) => setAllNotes(res.data))
      .catch((err) => console.error("Error fetching events:", err));

  }, []);

  return (

    <>
      <Viewtrend data={allNotes}/>
    </>
  );
}

export default Viewpage;
