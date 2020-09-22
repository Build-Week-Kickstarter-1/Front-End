import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Campaign from "./components/Campaign";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/campaign">
          <Campaign />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
