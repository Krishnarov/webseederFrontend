import axios from 'axios';
import React, { createContext, useState } from 'react'

export const mycontext = createContext();

export const TaksProvider = ({ children }) => {
      const [sticky, setsticky] = useState([]);
      const Api = import.meta.env.VITE_CONSTANT_API;

    const token = sessionStorage.getItem("currentToken");
  const getdata = async () => {
    try {
      const res = await axios.post(
        `${Api}/sticky/getAllSticksbyId`,
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


    return (
        <mycontext.Provider value={{sticky,getdata}}>
            {children}
        </mycontext.Provider>
    )
}   
