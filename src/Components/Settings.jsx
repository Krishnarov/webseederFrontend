import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Update from "./Update";

function Settings({ handalDarkMode }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );
  const [active, setactive] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

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

  useEffect(() => {
    handalDarkMode(darkMode);
  }, [darkMode]);

  return (
    <div
      className={` flex md:px-10 py-4 px-2 dark:bg-slate-900 dark:text-white min-h-screen`}
    >
      <div className="w-1/5">
        <Sidebar activeSection={"Settings"} />
      </div>
      <div className="w-4/5 ">
        <div className="md:text-4xl text-2xl font-bold">Settings</div>
        {active ? (
          <Update user={user} back={setactive}/>
        ) : (
          <div>
            <div className="shadow-md rounded-md p-4 mt-2 relative md:flex  md:items-center md:justify-between md:gap-5">
              <div className="flex justify-between px-4 w-72 md:w-1/3">
                <img
                  className="rounded-full drop-shadow-lg shadow-red-500"
                  src="/images/pofile.png"
                  alt="profile"
                />
              </div>
              <div className="md:w-2/3">
                <div className="flex justify-between px-4 w-72 md:mb-4 shadow-md rounded-md p-3 items-center mt-4 md:w-4/5">
                  <div className="font-bold">Name</div>
                  <div className="text-gray-500">{user.fullname}</div>
                </div>
                <div className="flex justify-between px-4 w-72 md:mb-4 shadow-md rounded-md p-3 items-center mt-4 md:w-4/5">
                  <div className="font-bold">Email</div>
                  <div className="text-gray-500">{user.email}</div>
                </div>

                <div className="absolute top-4 right-4  text-2xl cursor-pointer " onClick={() => setactive(!active)}>
                  <i className="ri-edit-2-fill"></i>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex justify-between px-4 shadow-md rounded-md p-3 items-center mt-4 ">
                <div className="font-bold">Dark Mode</div>
                <div className="text-gray-500">
                  {darkMode ? (
                    <i
                      className="text-2xl text-white cursor-pointer ri-sun-fill"
                      onClick={() => setDarkMode(!darkMode)}
                    ></i>
                  ) : (
                    <i
                      onClick={() => setDarkMode("dark")}
                      className="ri-moon-fill text-black cursor-pointer text-2xl"
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
