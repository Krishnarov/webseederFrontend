import React from "react";
function DashHero() {
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
    <div className="px-4 ">
      <div className="text-4xl font-bold ">Upcoming</div>
      
    </div>
  );
}

export default DashHero;
