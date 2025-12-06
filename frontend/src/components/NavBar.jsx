import React from "react";
import { Link } from "react-router-dom";
import { SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { House } from "lucide-react";
import { UserPen } from "lucide-react";
import { Plus } from "lucide-react";
import { Users } from "lucide-react";
import { LogOut } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { UserSearch } from "lucide-react";
import { assets } from "../assets/assets.js";
import UserProfileLink from "./UserProfileLink.jsx";

const NavBar = () => {
  const { isMobileMenuOpen } = React.useContext(AuthContext);
  const { user } = useUser();

  const navItems = [
    { title: "Feed", href: "/feed", icon: <House /> },
    { title: "Connections", href: "/connections", icon: <Users /> },
    { title: "Messages", href: "/messages", icon: <MessageCircle /> },
    { title: "Discover", href: "/discover", icon: <UserSearch /> },
    { title: "Profile", href: `/profile/${user.id}`, icon: <UserPen /> },
    { title: "Create Post", href: "/create-post", icon: <Plus /> },
  ];

  return (
    <nav
      className={`flex flex-col gap-4 fixed top-0 left-0 min-h-screen z-50 p-6 bg-white w-64 white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:w-64 lg:h-full lg:shadow-none lg:z-auto`}
    >
      <div>
        <img src={assets.logo} alt="" />
      </div>

      <hr className="border-slate-500" />

      <ul>
        {navItems.map((item) => (
          <Link key={item.title} to={item.href}>
            <li
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                item.title === "Create Post"
                  ? "justify-center gap-2 px-6 py-2.5 mt-2 rounded-md bg-gradient-to-r from-[#615FFF] to-[#9810FA] text-white text-base font-['Outfit'] hover:opacity-90"
                  : ""
              }`}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>

      <div className="absolute bottom-6 left-6 flex justify-between items-center w-52">
        <Link to={"/manage-profile"}>
          <UserProfileLink />
        </Link>
        <SignOutButton redirectUrl="/login">
          <LogOut />
        </SignOutButton>
      </div>
    </nav>
  );
};

export default NavBar;
