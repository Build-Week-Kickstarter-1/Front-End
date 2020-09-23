import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios
      .get("https://kickstarter-success-app.herokuapp.com/users/myinfo")
      .then((res) => {
        setUserInfo(res.data);
        console.log(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo]);

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/campaign">
        <button>Create a Campaign</button>
      </Link>
      {userInfo.map((campaign) => {
        return <div>{campaign}</div>;
      })}
    </div>
  );
}
