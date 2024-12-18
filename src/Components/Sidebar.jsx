import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Sidebar({ activeSection }) {
  const navegate = useNavigate();
  const hendalLogout = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Loged Out!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          const res = await axios.post(
            "https://webseederbackend-xgsh.onrender.com/user/logout",
            {},
            {  withCredentials: true}
          );
          // const res = await axios.post(
          //   "http://localhost:4000/user/logout",
          //   {},
          //   { withCredentials: true }
          // );
          sessionStorage.clear("currentToken")
          navegate("/");
          Swal.fire({
            title: "Loged Out !",
            text: "logout successfull !",
            icon: "success",
          });
        }
      });
      
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="px-4  bg-slate-100 h-[730px] rounded-lg flex  justify-between flex-col">
      <div>
        <div className="flex items-center justify-between py-2 border-b">
          <div className="text-xl font-bold">Menu</div>
          <div>
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <div className="flex items-center py-2 border rounded-lg mt-2">
          <div>
            <i className="ri-search-line px-2"></i>
          </div>
          <div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="bg-slate-100 outline-none"
            />
          </div>
        </div>
        <div className="font-bold text-xs mt-4">TASKS</div>
        <div className="text-sm font-semibold py-2">
          <div
            onClick={() => navegate("/dashboard")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 rounded-lg mt-2 ${
              activeSection === "Upcoming" && "bg-slate-200"
            }`}
          >
            <div className="flex items-center">
              <i className=" pr-2 ri-arrow-left-double-line"></i>
              <div>Upcoming</div>
            </div>
            <div className="flex items-center text-xs justify-center px-2 py-1 bg-slate-200 rounded-lg">
              12
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/today")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 rounded-lg mt-2 ${
              activeSection === "Today" && "bg-slate-200"
            }`}
          >
            <div className="flex items-center">
              <i class=" pr-2  ri-list-check-3"></i>
              <div>Today</div>
            </div>
            <div className="flex items-center justify-center px-2 py-1 text-xs bg-slate-200 rounded-lg">
              12
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/calender")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 rounded-lg mt-2 ${
              activeSection === "Calender" && "bg-slate-200"
            }`}
          >
            <div className="flex items-center">
              <i class=" pr-2  ri-calendar-2-line"></i>
              <div>Calender</div>
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/sticky")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 rounded-lg mt-2 ${
              activeSection === "Sticky" && "bg-slate-200"
            }`}
          >
            <div className="flex items-center">
              <i class=" pr-2  ri-sticky-note-fill"></i>
              <div>Sticky Wall</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="font-bold text-xs mt-4">LISTS</div>
        <div className="text-sm font-semibold py-2">
          <div
            onClick={() => navegate("/dashboard/Personal")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 rounded-lg mt-2 ${
              activeSection === "Personal" && "bg-slate-200"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2 bg-red-400 h-3 w-3 rounded"></span>
              <div>Personal</div>
            </div>
            <div className="flex items-center text-xs justify-center px-2 py-1 bg-slate-200 rounded-lg">
              3
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/Work")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 rounded-lg mt-2 ${
              activeSection === "Work" && "bg-slate-200"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2 bg-sky-400 h-3 w-3 rounded"></span>
              <div>Work</div>
            </div>
            <div className="flex items-center justify-center px-2 py-1 text-xs bg-slate-200 rounded-lg">
              3
            </div>
          </div>
          <div
            onClick={() => navegate("/dashboard/List1")}
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 rounded-lg mt-2 ${
              activeSection === "List1" && "bg-slate-200"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2 bg-yellow-400 h-3 w-3 rounded"></span>
              <div>List 1</div>
            </div>
            <div className="flex items-center justify-center px-2 py-1 text-xs bg-slate-200 rounded-lg">
              3
            </div>
          </div>
          <div
            className={`flex items-center  px-2 justify-between py-1 hover:bg-slate-200 rounded-lg mt-2 ${
              activeSection === "AddList" && "bg-slate-200"
            }`}
          >
            <div className="flex items-center">
              <p class=" pr-2 text-xl ">+</p>
              <div>Add New List</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="font-bold text-xs mt-4">TAGS</div>
        <div className="flex gap-2 mt-4">
          <div className="px-2 py-1 bg-sky-300 text-xs font-bold rounded-md">
            Tag 1
          </div>
          <div className="px-2 py-1 bg-red-300 text-xs font-bold rounded-md">
            Tag 1
          </div>
          <div className="px-2 py-1 bg-slate-300 text-xs font-bold rounded-md">
            + Add Tag{" "}
          </div>
        </div>
      </div>
      <div className=" py-2">
        <div onClick={() => navegate("/dashboard/Settings")} className="flex ">
          <i class="ri-equalizer-line pr-2"></i>

          <div>Settings</div>
        </div>
        <div className="flex cursor-pointer " onClick={() => hendalLogout()}>
          <i class="ri-logout-box-r-line pr-2"></i> <div>Sign out</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
