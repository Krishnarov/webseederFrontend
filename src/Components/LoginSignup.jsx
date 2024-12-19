import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ fullname: "", email: "", password: "", usertype: "" });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all required fields.",
        icon: "error",
      });
      return;
    }

    try {
      const res = await axios.post(
        `https://webseederbackend-xgsh.onrender.com/user/${
          isLogin ? "login" : "register"
        }`,
        formData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        if (res.data.user?.currentToken) {
          sessionStorage.setItem("currentToken", res.data.user.currentToken);
          Swal.fire({
            title: "Successfull !",
            text: res.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
        window.location.href = "/dashboard";
        }else{
          Swal.fire({
            title: "Signup Successfull !",
            text: res.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
          handleToggle(true)
        } 
      } else if(res.status===403){
        const confirmation = await Swal.fire({
          title: "Are you sure for Login ?",
          text: res.data.message,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Login !",
        });
        if (confirmation.isConfirmed) {
          const res = await axios.post(
            `https://webseederbackend-xgsh.onrender.com/user/logoutandlogin`,
            formData,
            { withCredentials: true }
          );
          if(res.status===201){
            if (res.data.user?.currentToken) {
              sessionStorage.setItem("currentToken", res.data.user.currentToken);
              Swal.fire({
                title: "Successfull !",
                text: res.data.message,
                icon: "success",
                showConfirmButton: false,
                timer: 2000
              });
             window.location.href = "/dashboard";
            }else {
              throw new Error("Token not found in response.");
            }
          }
        }

      }else {
        throw new Error("Unexpected response status: " + res.status);
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error",
        text:error.response?.data?.message ||
          "An error occurred while processing your request. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required={!isLogin}
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            />
          </div>
          {!isLogin && (
            <div>
              <div>
                Recruiter{" "}
                <input
                  type="radio"
                  name="usertype"
                  value="Recruiter"
                  onChange={handleChange}
                />{" "}
                Client{" "}
                <input
                  type="radio"
                  name="usertype"
                  id="client"
                  value="client"
                  onChange={handleChange}
                />{" "}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={handleToggle}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
