import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashHero from "./DashHero";
import axios from "axios";
import Swal from "sweetalert2";

function Dashboard() {
  const [sticky, setsticky] = useState([]);

  const token = sessionStorage.getItem("currentToken");

  if (!token) {
    Swal.fire({
      title: "Error",
      text: "You are not logged in!",
      icon: "error",
    });
    navegate("/");
    return;
  }

  const getdata = async () => {
    try {
      const res = await axios.post(
        "https://webseederbackend-xgsh.onrender.com/sticky/getAllSticksbyId",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setsticky(res.data.sticks);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="flex px-10 my-4">
      <div className="w-1/5">
        <Sidebar activeSection={"Upcoming"} />
      </div>
      <div className="w-4/5">
        <DashHero sticky={sticky} getdata={getdata}/>
      </div>
    </div>
  );
}

export default Dashboard;
