import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
function Update({ back, user }) {
  const [fullname, setFullname] = useState(user.fullname);
  const [photo, setPhoto] = useState(null);

  const Api = import.meta.env.VITE_CONSTANT_API;

  const hendalUpdate = async () => {
    try {
      if (!photo) {
        alert("Please select a photo");
        return;
      }
      const formData = new FormData();
      formData.append("fullname", fullname);
      if (photo) formData.append("photo", photo);

      const response = await axios.put(
        `${Api}/user/update/${user._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.currentToken}`,
          },
        }
      );
      sessionStorage.setItem("user", JSON.stringify(response.data.user));


      if (response.status === 200) {
      
        Swal.fire({
          title: "Success!",
          text: "Profile Updated Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex justify-center mt-20 ">
      <div className=" shadow rounded-lg border md:p-8 md:mx-5 p-4">
        <div className="flex mb-5 items-center">
          <div
            onClick={() => {
              back(false);
            }}
            className="cursor-pointer md:w-40 w-20"
          >
            ← Back
          </div>
          <div className="text-xl font-bold">Update Profile</div>
        </div>
        <form>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="p-2 w-full mb-2 border border-gray-300 rounded dark:bg-slate-900 dark:text-white "
          />
          <input
            type="file"
            name="photo"
            className="p-2 w-full mb-2 border border-gray-300 rounded dark:bg-slate-900 dark:text-white "
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <div
            onClick={() => hendalUpdate()}
            className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
