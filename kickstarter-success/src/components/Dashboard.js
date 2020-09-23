import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/users/myinfo")
      .then((res) => {
        setUserInfo(res.data.campaigns);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userInfo);

  return (
    <div>
      <h2>Dashboard</h2>
      <br />
      {userInfo.map((campaign) => {
        return (
          <div>
            <h3>{campaign.name}</h3>
            <p>{campaign.category}</p>
            <p>
              {campaign.goal} {campaign.currency}
            </p>
            <p>{campaign.launchdate}</p>
            <br />
          </div>
        );
      })}
      <Link to="/campaign">
        <button>Create a Campaign</button>
      </Link>
    </div>
  );
}
