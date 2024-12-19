import React from "react";
import Sidebar from "./Sidebar";
import DashHero from "./DashHero";

function Dashboard() {
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

  return (
    <div className="flex px-10 my-4">
      <div className="w-1/5">
        <Sidebar activeSection={"Upcoming"} />
      </div>
      <div className="w-4/5">
        <DashHero />
      </div>
    </div>
  );
}

export default Dashboard;
