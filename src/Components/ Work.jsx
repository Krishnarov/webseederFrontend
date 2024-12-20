import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Work() {
  const [sticky, setsticky] = useState([]);

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
  useEffect(() => {
    getdata();
  }, []);

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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#fd";
    return (color += letters[Math.floor(Math.random() * 16)]);
  };

  return (
    <div className="flex px-10 my-4">
      <div className="w-1/5">
        <Sidebar activeSection={"Work"} />
      </div>
      <div className="w-4/5">
        <h1>Work</h1>
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
        </div>
      </div>
    </div>
  );
}

export default Work;
