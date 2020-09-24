import React from "react";
import { Link } from "react-router-dom";
import "../styles/Registration.css";

export default function NavBar() {
	return (
		<nav className="nav-bar">
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
		</nav>
	);
}
