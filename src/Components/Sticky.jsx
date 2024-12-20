import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
function Sticky() {
  const [sticky, setsticky] = useState([]);
  const [active, setactive] = useState(false);
  const [newStick, setNewStick] = useState({ title: "", content: "" });
  const token = sessionStorage.getItem("currentToken");

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
    console.log(res);

    if (res.status === 201) {
      setNewStick({ title: "", content: "" });
      Swal.fire({
        title: "add successfull!",
        text: "add successfull!",
        icon: "success",
      });
    }
  };

  const getdata = async () => {
    try {
      const res = await axios.get(
        "https://webseederbackend-xgsh.onrender.com/sticky/getAllSticksbyId",
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
        setsticky(res.data.sticks);
      }
    } catch (error) {
      console.log(error);
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
    getdata();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#fd";
    return (color += letters[Math.floor(Math.random() * 16)]);
  };

  return (
    <div className="flex px-10 my-4">
      <div className="w-1/5">
        <Sidebar activeSection={"Sticky"} />
      </div>

      <div className="px-4 w-4/5">
        <div className="text-4xl font-bold ">Sticky Wall</div>
        {active ? (
          <div className="flex justify-center mt-20 ">
            <div className=" shadow rounded-lg border p-8">
              <div className="flex mb-5 items-center">
                <div
                  onClick={() => {
                    setactive(false), getdata();
                  }}
                  className="cursor-pointer w-40"
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
                  className="p-2 w-full mb-2 border border-gray-300 rounded"
                />
                <textarea
                  name="content"
                  rows={5}
                  placeholder="Content"
                  value={newStick.content}
                  onChange={handleChange}
                  className="p-2 w-full mb-2 border border-gray-300 rounded"
                />
                <div
                  onClick={handleAddStick}
                  className="w-full text-center bg-blue-500 text-white p-2 rounded"
                >
                  Add Stick
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-4 border rounded-lg shadow grid grid-cols-3 gap-4 mt-4">
            {sticky.map((e, index) => (
              <div key={index} className=" ">
                <div
                  style={{ backgroundColor: getRandomColor("00") }}
                  className={`min-h-72  p-4  gap-2 rounded-lg  bg-yellow relative`}
                >
                  <div className="text-xl font-bold">{e.title}</div>
                  <div className="py-2">{e.content}</div>
                  <div
                    onClick={() => hendaldeleta(e._id)}
                    className="absolute bottom-4 text-xl hover:text-red-500"
                  >
                    <i class="ri-delete-bin-fill"></i>
                  </div>
                </div>
              </div>
            ))}
            <div className=" ">
              <div
                onClick={() => setactive(true)}
                className="min-h-72  p-4 flex items-center text-9xl justify-center cursor-pointer rounded-lg bg-slate-200"
              >
                +
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sticky;
