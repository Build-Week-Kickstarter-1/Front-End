import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import registerSchema from "../RegisterValidation/registerSchema";

function RegisterForm() {
	////////////////////// Initial Values Here  //////////////////////

	const initialRegisterFormValues = {
		name: "",
		email: "",
		password: "",
		username: "",
	};

	const initialFormErrors = {
		name: "",
		email: "",
		password: "",
		username: "",
	};

	////////////////////// useStates Here  //////////////////////

	const [registerForm, setRegisterForm] = useState(initialRegisterFormValues);
	const [post, setPost] = useState([]);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	////////////////////// State Changes Here  //////////////////////

	const inputChange = (name, value) => {
		validate(name, value);
		setRegisterForm({
			...registerForm,
			[name]: value,
		});
	};

	const onChange = (event) => {
		const { name, value } = event.target;
		inputChange(name, value);
	};

	////////////////////// Form Information Here  //////////////////////

	////////////////////// New User Registration  //////////////////////

	const newUserSubmit = (newUser) => {
		axios
			.post("https://reqres.in/api/orders", newUser)
			.then((response) => {
				setPost([...post, response.data]);
				setRegisterForm(initialRegisterFormValues);
				// setFormErrors({initialFormValues});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {});
	};

	//////////////////// New Submission  //////////////////////

	const formSubmit = () => {
		const newOrder = {
			name: registerForm.name.trim(),
			email: registerForm.email.trim(),
			password: registerForm.password.trim(),
		};
		console.log(newOrder);
		newUserSubmit(newOrder);
	};

	const submitForm = (event) => {
		event.preventDefault();
		formSubmit();
	};

	//////////////////// Adding Validation  //////////////////////
	const validate = (name, value) => {
		yup
			.reach(registerSchema, name)
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
	//////////////////// Adding useEffect  //////////////////////
	useEffect(() => {
		registerSchema.isValid(registerForm).then((isValid) => {
			setButtonDisabled(!isValid);
		});
	}, [registerForm]);

	return (
		<form onSubmit={submitForm}>
			<label>
				Name:
				<input
					className="name-input"
					id="name"
					type="text"
					name="name"
					placeholder="Enter Name"
					value={registerForm.name}
					onChange={onChange}
				/>
				{formErrors.name.length > 2 ? (
					<h4 className="error"> {formErrors.name}</h4>
				) : null}
			</label>
			<br></br>
			<label>
				Username:
				<input
					className="username-input"
					id="username"
					type="text"
					name="username"
					placeholder="Enter Username"
					value={registerForm.username}
					onChange={onChange}
				/>
				{formErrors.username.length > 5 ? (
					<h4 className="error"> {formErrors.username}</h4>
				) : null}
			</label>
			<br></br>
			<label>
				Email:
				<input
					className="email-input"
					id="email"
					type="email"
					name="email"
					placeholder="Enter Email"
					value={registerForm.email}
					onChange={onChange}
				/>
				{formErrors.email.length > 0 ? <p>{formErrors.email}</p> : null}
			</label>
			<br></br>
			<label>
				Password:
				<input
					className="password-input"
					id="password"
					type="text"
					name="password"
					placeholder="Enter Password"
					value={registerForm.password}
					onChange={onChange}
				/>
				{formErrors.password.length > 0 ? <p>{formErrors.password}</p> : null}
			</label>
			<br></br>
			<button disabled={buttonDisabled}>Confirm</button>
		</form>

		///////////////////// Form Information Here  //////////////////////
	);
}

export default RegisterForm;
