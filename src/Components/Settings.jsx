import React from 'react'
import Sidebar from './Sidebar'

function Settings() {
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
      <Sidebar activeSection={"Settings"} />
    </div>
    <div className="w-4/5">
      <h1>Settings</h1>
    </div>
  </div>
  )
}

export default Settings
