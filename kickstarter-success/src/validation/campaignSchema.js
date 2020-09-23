import * as yup from "yup";

const campaignSchema = yup.object().shape({
	name: yup
		.string()
		.required("Name is required")
		.min(2, "Name must be 5 characters or longer"),
	category: yup
		.string()
		.required("category is required")
		.min(5, "Must have category"),
	goal: yup.string().required("goal is required").min(2, "Must have goal"),
	currency: yup
		.string()
		.required("currency is required")
		.min(5, "Must have currency"),
	launchdate: yup
		.string()
		.required("launchdate is required")
		.min(5, "Launchdate required"),
});

export default campaignSchema;
