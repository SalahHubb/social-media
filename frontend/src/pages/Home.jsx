import React from "react";
import Navbar from "../components/Navbar.jsx";
import Main from "../components/Main.jsx";

const Home = () => {
  return (
    <div className="w-screen h-screen flex bg-slate-50 relative">
      <Navbar />
      <Main />
    </div>
  );
};

export default Home;
