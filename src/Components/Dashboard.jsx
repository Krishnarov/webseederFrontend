import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashHero from "./DashHero";
import axios from "axios";
import Swal from "sweetalert2";

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
    <div className="flex md:px-10 px-2 py-4 dark:bg-slate-900 dark:text-white min-h-screen">
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
