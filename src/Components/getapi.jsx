import React from 'react'



export const getapi = async () => {
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




 
