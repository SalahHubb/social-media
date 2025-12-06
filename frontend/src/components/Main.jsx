import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";

const Main = () => {
  const { toggleMobileMenu } = React.useContext(AuthContext);
  return (
    <div className="flex-1 container mx-auto px-4 h-full overflow-y-auto relative">
      <Outlet /> {/* child routes will be rendered here */}
      {/* mobile menu */}
      <div
        className="bg-white rounded-2xl shadow-md p-2 fixed top-4 right-0 transform -translate-x-1/2 lg:hidden"
        onClick={toggleMobileMenu}
      >
        <Menu />
      </div>
    </div>
  );
};

export default Main;
