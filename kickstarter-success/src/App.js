import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import "./App.css";
import RegisterForm from "./components/RegisterForm";

function App() {
	return (
		<div className="App">
			<NavBar />
			<Switch>
				<Route path="/login">
					<LoginForm />
				</Route>
				<Route path="/register">
					<RegisterForm />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
