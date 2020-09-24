import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import schema from "../validation/loginSchema";
import history from "../utils/history";
import Kickstarter from "../styles/Assets/Kickstarter.jpg";

const initialFormValues = {
	username: "",
	password: "",
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

	const submit = (evt) => {
		evt.preventDefault();
		axios
			.post(
				"https://kickstarter-success-app.herokuapp.com/login",
				`grant_type=password&username=${formValues.username}&password=${formValues.password}`,
				{
					headers: {
						// btoa is converting our client id/client secret into base64
						Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("token", res.data.access_token);
				history.push("/dashboard");
				window.location.reload("/dashboard");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="login-form">
			<img src={Kickstarter} alt="logo" />
			<h2>Login</h2>
			<form onSubmit={submit}>
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
				</div>
			</form>
		</div>
	);
}
