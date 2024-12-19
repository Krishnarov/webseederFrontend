import React from "react";
import Sidebar from "./Sidebar";

function Personal() {
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
        <Sidebar activeSection={"Personal"} />
      </div>
      <div className="w-4/5">
        <h1>Personal</h1>
      </div>
    </div>
  );
}

export default Personal;
