import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import Loader from "./Loder";
import { mycontext } from "./Consext.jsx";
function Sticky() {
  const { sticky, getdata } = useContext(mycontext);
  const [active, setactive] = useState(false);
  const [allsticky, setallsticky] = useState([]);
  const [isLoding, setisLoding] = useState(true);

  const [newStick, setNewStick] = useState({
    title: "",
    content: "",
    date: "",
    category: "",
  });
  const token = sessionStorage.getItem("currentToken");

  const heandelsearch = (e) => {
    const key = e.target.value;
    const data = sticky.filter((e) => {
      return e.title.includes(key);
    });
    setallsticky(data);
  };

  if (!token) {
    Swal.fire({
      title: "Error",
      text: "You are not logged in!",
      icon: "error",
    });
    window.location.href = "/";
    return;
  }
  const handleChange = (e) => {
    setNewStick({ ...newStick, [e.target.name]: e.target.value });
  };

  const handleAddStick = async () => {
    setisLoding(true);
    try {
      const res = await axios.post(
        "https://webseederbackend-xgsh.onrender.com/sticky/create",
        newStick,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        }
      );

      setisLoding(false);
      if (res.status === 201) {
        setNewStick({ title: "", content: "" });
        Swal.fire({
          title: "add successfull!",
          text: "add successfull!",
          icon: "success",
        });
      }
    } catch (error) {
      setisLoding(false);

      Swal.fire({
        title: "Error",
        text: error.response.data.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

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
          `https://webseederbackend-xgsh.onrender.com/sticky/deletesticky/${e}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token || ""}`,
            },
          }
        );

        if (res.status === 200) {
          getdata();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  useEffect(() => {
    if (sticky.length === 0) {
      getdata();
    }
    if (sticky.length > 0) {
      setisLoding(false);
      setallsticky(sticky);
    }
  }, [sticky]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#fd";
    return (color += letters[Math.floor(Math.random() * 16)]);
  };

  return (
    <div className="flex md:px-10 px-2 py-4 dark:bg-slate-900 dark:text-white min-h-screen">
      <div className="w-1/5">
        <Sidebar activeSection={"Sticky"} heandelsearch={heandelsearch} />
      </div>

      <div className="md:px-4 w-4/5">
        <div className="md:text-4xl text-xl  font-bold ">Sticky Wall</div>
        {active ? (
          <div className="flex justify-center mt-20 ">
            {isLoding ? (
              <Loader h={"h-96"} />
            ) : (
              <div className=" shadow rounded-lg border md:p-8 md:mx-5 p-4">
                <div className="flex mb-5 items-center">
                  <div
                    onClick={() => {
                      setactive(false);
                    }}
                    className="cursor-pointer md:w-40 w-20"
                  >
                    ← Back
                  </div>
                  <div className="text-xl font-bold">Add Sticky</div>
                </div>
                <form>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newStick.title}
                    onChange={handleChange}
                    className="p-2 w-full mb-2 border border-gray-300 rounded dark:bg-slate-900 dark:text-white "
                  />
                  <textarea
                    name="content"
                    rows={5}
                    placeholder="Content"
                    value={newStick.content}
                    onChange={handleChange}
                    className="p-2 w-full mb-2 border border-gray-300 rounded dark:bg-slate-900 dark:text-white"
                  />
                  <div className="md:flex md:items-center md:flex-row md:justify-around mb-2">
                    <div className=" ">
                      <select
                        name="category"
                        value={newStick.category}
                        onChange={handleChange}
                        className="dark:bg-slate-800 dark:text-white w-full p-2"
                      >
                        <option value="">-- Select --</option>
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                      </select>
                    </div>
                    <div className=" py-2 mt-2">
                      <input
                        type="date"
                        name="date"
                        className="dark:bg-slate-900 dark:text-white"
                        onChange={handleChange}
                        value={newStick.date}
                      />
                    </div>
                  </div>
                  <div
                    onClick={handleAddStick}
                    className="w-full flex items-center justify-center cursor-pointer px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Add Stick
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 border rounded-lg shadow grid md:grid-cols-3 grid-cols-1  gap-4 mt-4">
            <div className=" ">
              <div
                onClick={() => {
                  setactive(true), setisLoding(false);
                }}
                className="min-h-72  p-4 flex items-center text-9xl justify-center cursor-pointer rounded-lg bg-slate-200"
              >
                +
              </div>
            </div>
            {allsticky.map((e, index) => (
              <div key={index} className=" ">
                <div
                  style={{ backgroundColor: getRandomColor("00") }}
                  className={`min-h-72  p-4  gap-2 rounded-lg  bg-yellow relative text-black`}
                >
                  <div className="text-xl font-bold">{e.title}</div>
                  <div className="py-2">{e.content}</div>
                  <div
                    onClick={() => hendaldeleta(e._id)}
                    className="absolute bottom-4 text-xl  hover:text-red-500"
                  >
                    <i className="ri-delete-bin-fill"></i>
                  </div>
                </div>
              </div>
            ))}
            {isLoding && <Loader h={"h-screen"} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sticky;
