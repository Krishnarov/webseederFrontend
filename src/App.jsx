import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginSignup from "./Components/LoginSignup";
import Dashboard from "./Components/Dashboard";
import Sticky from "./Components/Sticky";
import Today from "./Components/Today"
import Calender from "./Components/ Calender"
import Work from "./Components/ Work"
import Personal from "./Components/ Personal"
import List from "./Components/List"
import Settings from "./Components/Settings";

function App() {
  const [userActive, setUserActive] = useState([]);
  const [loading, setLoading] = useState(true);

  const gettoken = async () => {
    const token = await sessionStorage.getItem("currentToken");
    setUserActive(token);
    setLoading(false);

    
  };
useEffect(()=>{
  // if(userActive===""){

    gettoken()
  // }
},[userActive])


if (loading) {
  return <div className="text-center mt-72 text-2xl ">Loading...</div>; 
}
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          {userActive && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/sticky" element={<Sticky />} />
              <Route path="/dashboard/today" element={<Today />} />
              <Route path="/dashboard/Calender" element={<Calender />} />
              <Route path="/dashboard/Work" element={<Work />} />
              <Route path="/dashboard/Personal" element={<Personal />} />
              <Route path="/dashboard/List1" element={<List />} />
              <Route path="/dashboard/Settings" element={<Settings />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
