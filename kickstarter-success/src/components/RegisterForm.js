import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import registerSchema from "../RegisterValidation/registerSchema";
import "../RegisterValidation/Registration.css";

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
			.post(
				"https://kickstarter-success-app.herokuapp.com/createnewuser",
				newUser
			)
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
			username: registerForm.name.trim(),
			// email: registerForm.email.trim(),
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

	// const axiosWithAuth = () => {
	//  const token = window.localStorage.getItem("token");
	//  return axios.create({
	//      headers: {
	//          Authorization: `Bearer ${token}`,
	//      },
	//      baseURL: "https://kickstarter-success-app.herokuapp.com",
	//  });
	// };

	//////////////////// Form Information  //////////////////////
	return (
		<form onSubmit={submitForm}>
			<h1> Registration </h1>
			<label>
				<input
					className="name-input"
					id="name"
					type="text"
					name="name"
					placeholder="Name"
					value={registerForm.name}
					onChange={onChange}
				/>
				{formErrors.name.length > 2 ? (
					<h4 className="error"> {formErrors.name}</h4>
				) : null}
			</label>
			<label>
				<input
					className="username-input"
					id="username"
					type="text"
					name="username"
					placeholder="Username"
					value={registerForm.username}
					onChange={onChange}
				/>
				{formErrors.username.length > 5 ? (
					<h4 className="error"> {formErrors.username}</h4>
				) : null}
			</label>
			{/* <label>
				<input
					className="email-input"
					id="email"
					type="email"
					name="email"
					placeholder="Email"
					value={registerForm.email}
					onChange={onChange}
				/>
				{formErrors.email.length > 0 ? <p>{formErrors.email}</p> : null}
			</label> */}
			<label>
				<input
					className="password-input"
					id="password"
					type="text"
					name="password"
					placeholder="Password"
					value={registerForm.password}
					onChange={onChange}
				/>
				{formErrors.password.length > 0 ? <p>{formErrors.password}</p> : null}
			</label>
			<button disabled={buttonDisabled}>Confirm</button>
		</form>

		///////////////////// Form Information Here  //////////////////////
	);
}

export default RegisterForm;
