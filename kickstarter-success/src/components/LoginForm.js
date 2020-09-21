import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialFormValues = {
  username: "",
  passowrd: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form>
        <div className="errors-container"></div>

        <div className="form-container">
          <div className="input-container">
            <lable>Username:</lable>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
            />
          </div>

          <div className="input-container">
            <lable>Password:</lable>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <button>Submit</button>
          <br />

          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
