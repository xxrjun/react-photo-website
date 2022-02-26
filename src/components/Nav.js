import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={{ minHeight: "10vh" }}>
      <h1>Photo Website Project - Pexels API</h1>
      <ul>
        <li>
          <Link to="/react-photo-website/">Home</Link>
        </li>
        <li>
          <Link to="/react-photo-website/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
