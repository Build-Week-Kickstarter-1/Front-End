import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/login">Login</Link>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
        </Switch>
      </nav>
    </div>
  );
}

export default App;
