import React from "react";
import Weather from "./Weather";
import Addmood from "./Addmood";

function Homepage() {
  return (
    <>
    <div className="homepage">
      <div className="addcomponent">
        <Addmood></Addmood>
      </div>
      <div className="weathercomponent">
        <Weather></Weather>
      </div>
    </div>  
    </>
  );
}

export default Homepage;
