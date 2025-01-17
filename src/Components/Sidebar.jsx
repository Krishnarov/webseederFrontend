import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { mycontext } from "./Consext.jsx";

function Sidebar({ activeSection ,heandelsearch}) {
  const [length, setlength] = useState({
    upcomingle: 0,
    todaylen: 0,
    personalLen: 0,
    workLen: 0,
    list1Len: 0,
  });
  const Api = import.meta.env.VITE_CONSTANT_API;

  const { sticky, getdata } = useContext(mycontext);
  const navegate = useNavigate();
  const token = sessionStorage.getItem("currentToken");
  const user = JSON.parse(sessionStorage.getItem("user"));

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
    if (sticky.length === 0) {
      getdata();
    }
    setUpcomingleth();
    settodayleth();
    setPersonleth();
    setWorkleth();
    setListleth();
  }, [sticky]);

  const setUpcomingleth = () => {
    const currentDate = new Date();
    const UpcmingNotes = sticky.filter(
      (note) => new Date(note.date) > currentDate
    );
    setlength((prevstat) => ({ ...prevstat, upcomingle: UpcmingNotes.length }));
  };
  const setPersonleth = () => {
    const personal = sticky.filter((note) => note.category === "Personal");
    setlength((prevstat) => ({ ...prevstat, personalLen: personal.length }));
  };
  const setWorkleth = () => {
    const work = sticky.filter((note) => note.category === "Work");
    setlength((prevstat) => ({ ...prevstat, workLen: work.length }));
  };
  const setListleth = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const list = sticky.filter((e) => {
      return new Date(e.date).toISOString().split("T")[0] < currentDate;
    });
    setlength((prevstat) => ({ ...prevstat, list1Len: list.length }));
  };
  const settodayleth = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const TodayNotes = sticky.filter((e) => {
      return new Date(e.date).toISOString().split("T")[0] === currentDate;
    });
    setlength((prevState) => ({ ...prevState, todaylen: TodayNotes.length }));
  };
  const hendalLogout = async () => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Loged Out!",
      });

      if (confirmation.isConfirmed) {
        const res = await axios.post(
          `${Api}/user/logout`,
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
          sessionStorage.removeItem("currentToken");

          Swal.fire({
            title: "Loged Out !",
            text: "logout successfull !",
            icon: "success",
          });
          window.location.href = "/";
        } else {
          throw new Error("Logout failed");
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Logout failed. Please try again.",
        icon: "error",
      });
    }
  };
  // console.log(length);
  return (
    <div className="px-4  bg-slate-100  rounded-lg flex  justify-between flex-col fixed z-10 dark:bg-slate-800 dark:text-white ">
      <div>
        <div className="flex items-center justify-between py-2 border-b">
          <div className="text-xl font-bold md:block hidden">
            {user ? user.fullname : "Menu"}
          </div>
          <div>{/* <i className="ri-menu-line"></i> */}</div>
        </div>
        <div className="flex items-center py-2 border rounded-lg mt-2">
          <div>
            <i className="ri-search-line px-2"></i>
          </div>
          <div className="md:block hidden">
            <input
              type="text"
              name="search"
              onChange={(e) => heandelsearch(e)}

              placeholder="Search"
              className="bg-slate-100 outline-none  dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
        <div className="font-bold text-xs mt-4">TASKS</div>
        <div className="text-sm font-semibold py-2">
          <div
            onClick={() => navegate("/dashboard")}
            className={`flex items-center  px-2 justify-between py-1  hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mt-2 ${
              activeSection === "Upcoming" && "bg-slate-200 dark:bg-slate-700 "
            }`}
          >
            <div className="flex items-center">
              <i className=" pr-2 ri-arrow-left-double-line"></i>
              <div className="md:block hidden">Upcoming</div>
            </div>
            <div className="md:flex items-center text-xs justify-center px-2 py-1 bg-slate-200 rounded-lg  hidden dark:bg-slate-800 dark:text-white  ">
              {length.upcomingle}
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/today")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mt-2 ${
              activeSection === "Today" && "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <div className="flex items-center">
              <i className=" pr-2  ri-list-check-3"></i>
              <div className="md:block hidden">Today</div>
            </div>
            <div className="md:flex items-center justify-center px-2 py-1 text-xs bg-slate-200 rounded-lg  hidden dark:bg-slate-800 dark:text-white">
              {length.todaylen}
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/calender")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mt-2 ${
              activeSection === "Calender" && "bg-slate-200 dark:bg-slate-700 "
            }`}
          >
            <div className="flex items-center">
              <i className=" pr-2  ri-calendar-2-line"></i>
              <div className="md:block hidden">Calender</div>
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/sticky")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mt-2 ${
              activeSection === "Sticky" && "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <div className="flex items-center">
              <i className=" pr-2  ri-sticky-note-fill"></i>
              <div className="md:block hidden">Sticky Wall</div>
            </div>
            <div className="md:flex items-center justify-center px-2 py-1 text-xs bg-slate-200 rounded-lg  hidden dark:bg-slate-800 dark:text-white">
              {sticky.length}
            </div>
          </div>
        </div>
        <hr />
        <div className="font-bold text-xs mt-4">LISTS</div>
        <div className="text-sm font-semibold py-2">
          <div
            onClick={() => navegate("/dashboard/Personal")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mt-2 ${
              activeSection === "Personal" && "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2 bg-red-400 h-3 w-3 rounded"></span>
              <div className="md:block hidden">Personal</div>
            </div>
            <div className="md:flex items-center text-xs justify-center px-2 py-1 bg-slate-200 rounded-lg hidden dark:bg-slate-800 dark:text-white">
              {length.personalLen}
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/Work")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mt-2 ${
              activeSection === "Work" && "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2 bg-sky-400 h-3 w-3 rounded"></span>
              <div className="md:block hidden">Work</div>
            </div>
            <div className="md:flex items-center justify-center px-2 py-1 text-xs bg-slate-200 rounded-lg hidden dark:bg-slate-800 dark:text-white">
              {length.workLen}
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/List1")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mt-2 ${
              activeSection === "List1" && "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2 bg-yellow-400 h-3 w-3 rounded"></span>
              <div className="md:block hidden">List 1</div>
            </div>
            <div className="md:flex items-center justify-center px-2 py-1 text-xs bg-slate-200 rounded-lg hidden dark:bg-slate-800 dark:text-white">
              {length.list1Len}
            </div>
          </div>
          <div
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg mt-2 ${
              activeSection === "AddList" && "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <div className="flex items-center">
              <p className=" pr-2 text-xl ">+</p>
              <div className="md:block hidden">Add New List</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="font-bold text-xs mt-4">TAGS</div>
        <div className="flex gap-2 md:flex-row flex-col mt-4">
          <div className="px-2 py-1 bg-sky-300 text-xs font-bold rounded-md flex items-center">
            <span>
              <i className="ri-price-tag-3-fill"></i>
            </span>
            <span className="md:block hidden">Tag 1</span>
          </div>
          <div className="px-2 py-1 bg-red-300 text-xs font-bold rounded-md flex items-center">
            <span>
              <i className="ri-price-tag-3-fill"></i>
            </span>
            <span className="md:block hidden">Tag 2</span>{" "}
          </div>
          <div className="px-2 py-1 bg-slate-300 text-xs font-bold rounded-md flex items-center">
            <span>+</span>
            <span className="md:block hidden ml-1">Add Tag</span>
          </div>
        </div>
      </div>
      <div className=" py-2 mt-20">
        <div onClick={() => navegate("/dashboard/Settings")} className="flex ">
          <i className="ri-equalizer-line pr-2 text-2xl"></i>

          <div className="md:block hidden hover:underline">Settings</div>
        </div>
        <div
          className="flex cursor-pointer  border-b pb-2 mb-2"
          onClick={() => hendalLogout()}
        >
          <i className="ri-logout-box-r-line text-red-500 pr-2 text-2xl"></i>{" "}
          <div className="md:block hidden hover:underline">Sign out</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
