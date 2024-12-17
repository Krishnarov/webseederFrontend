import React from "react";
import Sidebar from "./Sidebar";

function Today() {
  return (
    <div className="flex px-10 my-4">
      <div className="w-1/5">
        <Sidebar activeSection={"Today"} />
      </div>
      <div className="w-4/5">
        <h1>Today</h1>
      </div>
    </div>
  );
}

export default Today;
