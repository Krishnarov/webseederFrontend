import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import TimeAgo from "./TimeAgo.jsx";
import { mycontext } from "./Consext.jsx";
import Loder from "./Loder.jsx";
function DashHero() {
  const [isLoding, setisLoding] = useState(true);

  const { sticky, getdata } = useContext(mycontext);

  const [upcoming, setUpcoming] = useState([]);
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

  useEffect(() => {
    if (sticky.length === 0) {
      getdata();
    }

    const currentDate = new Date();
    const UpcmingNotes = sticky.filter(
      (note) => new Date(note.date) > currentDate
    );
    setUpcoming(UpcmingNotes);
    if(UpcmingNotes.length > 0){
      setisLoding(false)
    }
  }, [sticky]);

  if(isLoding){
    return <Loder h={"h-screen"}/>
  }
  return (
    <div className="md:px-4">
      <div className="md:text-4xl text-2xl font-bold ">Upcoming</div>

      <div className="p-4 border rounded-lg shadow grid md:grid-cols-3 gap-4 mt-4 grid-cols-1">
        {upcoming.map((e, index) => (
          <div key={index} className=" ">
            <div
              style={{ backgroundColor: getRandomColor("00") }}
              className={`min-h-72 text-black p-4  gap-2 rounded-lg  bg-yellow relative`}
            >
              <div className="text-sx text-stone-500 absolute right-4 top-2">
                <TimeAgo date={e.date} />
              </div>
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
  );
}

export default DashHero;
