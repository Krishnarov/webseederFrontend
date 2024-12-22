import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import TimeAgo from "./TimeAgo";
import { mycontext } from "./Consext";
import Loader from "./Loder";

function Today() {
  const { sticky, getdata } = useContext(mycontext);
  const [todaysticky, setToday] = useState([]);
  const token = sessionStorage.getItem("currentToken");
  const [isLoding, setisLoding] = useState(true);

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
    settodaysticky();
    if (sticky.length > 0) {
      setisLoding(false);
    }
  }, [sticky]);

  const settodaysticky = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const today = sticky.filter((e) => {
      return new Date(e.date).toISOString().split("T")[0] === currentDate;
    });
    setToday(today);
  };

  const hendaldeleta = (e) => {
    console.log(token);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://webseederbackend-xgsh.onrender.com/sticky/deletesticky/${e}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          // getdata();
          Swal.fire({
            title: " Congratulation !",
            text: "Your Have Successfully Task completed",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  const hendalDoneTask = async (e) => {
    console.log(token, e);
    const res = await axios.put(
      `https://webseederbackend-xgsh.onrender.com/sticky/taskdone/${e}`,
      { isDone: true },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      // getdata();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#fd";
    return (color += letters[Math.floor(Math.random() * 16)]);
  };

  return (
    <div className="flex md:px-10 px-2 py-4 dark:bg-slate-900 dark:text-white min-h-screen">
      <div className="w-1/5">
        <Sidebar activeSection={"Today"} />
      </div>
      <div className="w-4/5">
        <div className="md:text-4xl text-2xl font-bold ">Today</div>
        <div>
            {isLoding && <Loader h={"h-screen"}/>}
          <div className="p-4 border rounded-lg shadow grid md:grid-cols-3 gap-4 mt-4 grid-cols-1  ">
            {todaysticky.map((e, index) => (
              <div key={index} className=" ">
                <div
                  style={{ backgroundColor: getRandomColor("00") }}
                  className={`min-h-72 text-black p-4  gap-2 rounded-lg  bg-yellow relative`}
                >
                  <div className="text-sx text-stone-500 absolute right-4 top-2">
                    <TimeAgo date={e.createdAt} />
                  </div>

                  <div className="text-xl font-bold">{e.title}</div>
                  <div className="py-2">{e.content}</div>
                  <div
                    onClick={() => hendaldeleta(e._id)}
                    className="absolute bottom-4 text-xl hover:text-red-500"
                  >
                    <i className="ri-delete-bin-fill"></i>
                  </div>
                  <div
                    onClick={() => hendalDoneTask(e._id)}
                    className="absolute bottom-4 right-4 text-xl hover:text-blue-500"
                  >
                    {e.isDone ? (
                      <i className="ri-check-double-line"></i>
                    ) : (
                      <i className="ri-check-line"></i>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Today;
