import * as yup from "yup";

export default yup.object().shape({
	username: yup
		.string()
		.required("Username is required")
		.min(3, "Username must be 3 chars or longer"),
	email: yup
		.string()
		.email("Must be a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be 8 characters or longer"),
});
