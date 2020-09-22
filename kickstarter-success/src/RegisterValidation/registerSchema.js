import * as yup from "yup";

const registerSchema = yup.object().shape({
	name: yup
		.string()
		.required("Name is required")
		.min(5, "Name must be 5 characters or longer"),
	email: yup
		.string()
		.email("Must be a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be 8 characters or longer"),
});

export default registerSchema;
