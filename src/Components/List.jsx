import React from "react";
import Sidebar from "./Sidebar";

function List() {
  return (
    <div className="flex px-10 my-4">
      <div className="w-1/5">
        <Sidebar activeSection={"List1"} />
      </div>
      <div className="w-4/5">
        <h1>List</h1>
      </div>
    </div>
  );
}

export default List;
