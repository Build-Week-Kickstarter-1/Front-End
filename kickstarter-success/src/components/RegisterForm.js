import React, { useState, useEffect } from "react";
// import * as yup from "yup";
// import axios from "axios";

function RegisterForm() {
	////////////////////// Initial Values Here  //////////////////////

	const initialRegisterFormValues = {
		name: "",
		instructions: "",
		email: "",
	};

	// const initialFormErrors = {
	//  name: "",
	//  instructions: "",
	//  size: "",
	// };

	////////////////////// Initial Values Here  //////////////////////

	////////////////////// useStates Here  //////////////////////

	const [registerForm, setRegisterForm] = useState(initialRegisterFormValues);

	////////////////////// useStates Here  //////////////////////

	////////////////////// Form Information Here  //////////////////////

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
				/>
			</label>
			<label>
				Email:
				<input
					id="email"
					type="email"
					name="email"
					placeholder="Enter Email Here"
					value={registerForm.email}
				/>
			</label>
			<label>
				Email:
				<input
					id="password"
					type="text"
					name="paswword"
					placeholder="Enter Password Here"
					value={registerForm.password}
				/>
			</label>
		</form>

		///////////////////// Form Information Here  //////////////////////
	);
}

export default RegisterForm;
