import React, { createContext, useState } from "react";


export const MyContext = createContext();
const MyProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "John Doe", age: 25 });

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
