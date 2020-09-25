import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Campaign from "./components/Campaign";
import "./styles/App.css";

import "./App.css";
import AlertMessage from "./components/AlertMessage";
import NavBar from "./components/NavBar";
import Routes from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <NavBar />
      <AlertMessage />
      <Routes />
    </div>
  );
}

export default App;
