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

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/campaign">
        <button>Create a Campaign</button>
      </Link>
      {/* {userInfo.map((campaign) => {
        return <div>{campaign}</div>;
      })} */}
    </div>
  );
}
