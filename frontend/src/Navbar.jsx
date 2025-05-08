import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div class="navbar">
        <div className="navbar-link"><Link to="/">Home</Link></div>
        <div className="navbar-link"><Link to="/history">History</Link></div>
        <div className="navbar-link"><Link to="/viewtrends">View</Link></div>
      </div>
    </>
  );
}

export default Navbar;
