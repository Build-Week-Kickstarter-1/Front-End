import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import schema from "../validation/loginSchema";

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
  const [disabled, setDisabled] = useState(true);

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  const change = (evt) => {
    const { name, value } = evt.target;
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form>
        <div className="errors-container">
          <p>{formErrors.username}</p>
          <p>{formErrors.password}</p>
        </div>

        <div className="form-container">
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={change}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={change}
            />
          </div>

          <button disabled={disabled}>Submit</button>

          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
