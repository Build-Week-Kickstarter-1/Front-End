import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <nav className="nav-bar">
      <Link to="/login">Login</Link>
    </nav>
  );
}
