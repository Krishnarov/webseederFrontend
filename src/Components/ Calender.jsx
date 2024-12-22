import React from "react";
import Sidebar from "./Sidebar";

function Calender() {
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
        <Sidebar activeSection={"Calender"} />
      </div>
      <div className="w-4/5">
        <div className="md:text-4xl text-2xl font-bold ">Calender</div>
      </div>
    </div>
  );
}

export default Calender;
