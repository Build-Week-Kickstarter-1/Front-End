import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [quotes, setQuotes] = useState();

  useEffect(() => {
    axios
      .get("https://kickstarter-success-app.herokuapp.com/campaigns/all")
      .then((res) => {
        setQuotes(res.data);
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
    </div>
  );
}
