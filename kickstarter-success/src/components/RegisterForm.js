import React, { useState, useEffect } from "react";
// import * as yup from "yup";
// import axios from "axios";

function RegisterForm() {
	////////////////////// Initial Values Here  //////////////////////

	const initialRegisterFormValues = {
		name: "",
		email: "",
		password: "",
	};

	// const initialFormErrors = {
	//  name: "",
	//  instructions: "",
	//  size: "",
	// };

	////////////////////// useStates Here  //////////////////////

	const [registerForm, setRegisterForm] = useState(initialRegisterFormValues);
	const [post, setPost] = useState([]);

	////////////////////// State Changes Here  //////////////////////

	const inputChange = (name, value) => {
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

	// const newUserSubmit = (newUser) => {
	// 	axios
	// 		.post("https://reqres.in/api/orders", newUser)
	// 		.then((response) => {
	// 			setPost([...post, response.data]);
	// 			setRegisterForm(initialRegisterFormValues);
	// 			// setFormErrors({initialFormValues});
	// 		})
	// 		.catch((error) => {
	// 			debugger;
	// 			console.log(error);
	// 		})
	// 		.finally(() => {});
	// };

	////////////////////// New Submission  //////////////////////

	// const formSubmit = () => {
	// 	const newOrder = {
	// 		name: registerForm.name.trim(),
	// 		email: registerForm.instructions.trim(),
	// 		password: registerForm.size.trim()

	// 	};
	// 	console.log(newOrder);
	// 	newUserSubmit(newOrder);
	// };

	// const submitForm = (event) => {
	// 	event.preventDefault();
	// 	formSubmit();
	// };

	return (
		<form>
			<label>
				Name:
				<input
					id="name"
					type="text"
					name="name"
					placeholder="Enter Name Here"
					value={registerForm.name}
					onChange={onChange}
				/>
			</label>
			<br></br>
			<label>
				Email:
				<input
					id="email"
					type="email"
					name="email"
					placeholder="Enter Email Here"
					value={registerForm.email}
					onChange={onChange}
				/>
			</label>
			<br></br>
			<label>
				Password:
				<input
					id="password"
					type="text"
					name="password"
					placeholder="Enter Password Here"
					value={registerForm.password}
					onChange={onChange}
				/>
			</label>
			<br></br>
			<button>Confirm</button>
		</form>

		///////////////////// Form Information Here  //////////////////////
	);
}

export default RegisterForm;
