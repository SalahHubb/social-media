import { Link, Outlet } from "react-router-dom";
import { Users } from "lucide-react";
import { UserCheck } from "lucide-react";
import { UserPlus } from "lucide-react";
import { UserPen } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Connections() {
  const { mainUser, pendingRequests, connections } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-[#0F172B] leading-9 mb-2">
            Connections
          </h1>
          <p className="text-base text-[#45556C] leading-6">
            Connect with people around the world
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white px-4 py-2 shadow-sm rounded-md flex flex-col justify-center items-center lg:px-4 lg:py-2">
            <p>{mainUser?.followers?.length || 0}</p>
            <p>Followers</p>
          </div>
          <div className="bg-white p-2 shadow-sm rounded-md flex flex-col justify-center items-center lg:px-4 lg:py-2">
            <p>{mainUser?.following?.length || 0}</p>
            <p>Following</p>
          </div>
          <div className="bg-white p-2 shadow-sm rounded-md flex flex-col justify-center items-center lg:px-4 lg:py-2">
            <p>{pendingRequests?.length || 0}</p>
            <p>Pending</p>
          </div>
          <div className="bg-white p-2 shadow-sm rounded-md flex flex-col justify-center items-center lg:px-4 lg:py-2">
            <p>{connections?.length || 0}</p>
            <p>Connections</p>
          </div>
        </div>

        <div className="w-full flex justify-between flex-wrap bg-white p-3 rounded-md my-6 lg:w-[60%]">
          <Link
            to={"/connections/followers"}
            className="flex gap-2 cursor-pointer"
          >
            <Users />
            <span className="text-gray-500">Followers</span>
          </Link>
          <Link
            to={"/connections/following"}
            className="flex gap-2 cursor-pointer"
          >
            <UserCheck />
            <span className="text-gray-500">Following</span>
          </Link>
          <Link
            to={"/connections/pending"}
            className="flex gap-2 cursor-pointer"
          >
            <UserPen />
            <span className="text-gray-500">Pending</span>
          </Link>
          <Link
            to={"/connections/user-connections"}
            className="flex gap-2 items-center cursor-pointer"
          >
            <UserPlus />
            <span className="text-gray-500">Connections</span>
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
