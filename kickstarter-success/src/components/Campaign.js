import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import campaignSchema from "../validation/campaignSchema";
import "../styles/Registration.css";

function RegisterForm() {
	////////////////////// Initial Values Here  //////////////////////

	const initialRegisterFormValues = {
		name: "",
		category: "",
		goal: "",
		currency: "",
		launchdate: "",
	};

	const initialFormErrors = {
		name: "",
		category: "",
		goal: "",
		currency: "",
		launchdate: "",
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

	const newUserSubmit = (newCampaign) => {
		axios
			.post(
				"https://kickstarter-success-app.herokuapp.com/campaigns/campaign",
				newCampaign
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
			name: registerForm.name.trim(),
			category: registerForm.category.trim(),
			goal: registerForm.goal.trim(),
			currency: registerForm.currency.trim(),
			launchdate: registerForm.launchdate.trim(),
		};
		console.log(newOrder);
		newUserSubmit(newOrder);
		setRegisterForm(initialRegisterFormValues);
	};

	const submitForm = (event) => {
		event.preventDefault();
		formSubmit();
		setRegisterForm(initialRegisterFormValues);
	};

	//////////////////// Adding Validation  //////////////////////
	const validate = (name, value) => {
		yup
			.reach(campaignSchema, name)
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
		campaignSchema.isValid(registerForm).then((isValid) => {
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
			<h1> Creating a Campaign </h1>
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
					className="category-input"
					id="category"
					type="text"
					name="category"
					placeholder="Category"
					value={registerForm.category}
					onChange={onChange}
				/>
				{formErrors.category.length > 5 ? (
					<h4 className="error"> {formErrors.category}</h4>
				) : null}
			</label>
			<label>
				<input
					className="goal-input"
					id="goal"
					type="text"
					name="goal"
					placeholder="Goal"
					value={registerForm.goal}
					onChange={onChange}
				/>
				{formErrors.goal.length > 0 ? (
					<h4 className="error"> {formErrors.goal}</h4>
				) : null}
			</label>
			<label>
				<input
					className="currency-input"
					id="currency"
					type="text"
					name="currency"
					placeholder="currency"
					value={registerForm.currency}
					onChange={onChange}
				/>
				{formErrors.currency.length > 0 ? (
					<h4 className="error">{formErrors.currency}</h4>
				) : null}
			</label>
			<label>
				<input
					className="launchdate-input"
					id="launchdate"
					type="text"
					name="launchdate"
					placeholder="Launchdate"
					value={registerForm.launchdate}
					onChange={onChange}
				/>
				{formErrors.launchdate.length > 0 ? (
					<h4 className="error">{formErrors.launchdate}</h4>
				) : null}
			</label>
			<button disabled={buttonDisabled}>Confirm</button>
		</form>

		///////////////////// Form Information Here  //////////////////////
	);
}

export default RegisterForm;
