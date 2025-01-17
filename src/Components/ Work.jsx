import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { mycontext } from "./Consext";
import Loader from "./Loder.jsx";
function Work() {
const {sticky,getdata}=useContext(mycontext)
const [isLoding, setIsLoding] = useState(true);
const [Wokrsticky, setWokrsticky] = useState([]);
  const token = sessionStorage.getItem("currentToken");
  const Api = import.meta.env.VITE_CONSTANT_API;

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
    if(sticky.length===0){
      getdata();

    }
    getWokrsticky();
    if(sticky.length>0){
      setIsLoding(false)
    }

  }, [sticky]);
const getWokrsticky=()=>{
  const worksticky=sticky.filter((e) => e.category === "Work")
  setWokrsticky(worksticky)
}
  const hendaldeleta = (e) => {
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
          `${Api}/sticky/deletesticky/${e}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token || ""}`,
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
      }
    });
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#fd";
    return (color += letters[Math.floor(Math.random() * 16)]);
  };

  return (
    <div className="flex md:px-10 px-2 py-4 dark:bg-slate-900 dark:text-white min-h-screen">  
      <div className="w-1/5">
        <Sidebar activeSection={"Work"} />
      </div>
      <div className="w-4/5">
        <h1>Work</h1>
        {isLoding && <Loader h={"h-screen"} />}
        <div className="p-4 border rounded-lg shadow grid md:grid-cols-3 gap-4 mt-4 grid-cols-1 ">
          {Wokrsticky.map((e, index) => (
            <div key={index} className=" ">
              <div
                style={{ backgroundColor: getRandomColor("00") }}
                className={`min-h-72 text-black p-4  gap-2 rounded-lg  bg-yellow relative`}
              >
                <div className="text-xl font-bold">{e.title}</div>
                <div className="py-2">{e.content}</div>
                <div
                  onClick={() => hendaldeleta(e._id)}
                  className="absolute bottom-4 text-xl hover:text-red-500"
                >
                  <i className="ri-delete-bin-fill"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Work;
