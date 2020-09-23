import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

export default function Dashboard() {
	const [userInfo, setUserInfo] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get("/users/myinfo")
			.then((res) => {
				setUserInfo(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	console.log(userInfo.campaigns, "This is .campaigns");
	return (
		<div>
			<h2>Dashboard</h2>
			<Link to="/campaign">
				<button>Create a Campaign</button>
			</Link>
			{/* {info.campaigns.map((campaign) => {
				return (
					<div>
						<p>{campaign}</p>
					</div>
				);
			})} */}
		</div>
	);
}
