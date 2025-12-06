import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const UserProfileLink = () => {
  const { user, isSignedIn } = useContext(AuthContext);

  if (!isSignedIn || !user) return null;

  return (
    <div className="flex gap-2 items-center">
      <img src={user.imageUrl} alt="" className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-semibold">{user.firstName + " " + user.lastName}</p>
        <p className="text-sm text-gray-500">{user.username}</p>
      </div>
    </div>
  );
};

export default UserProfileLink;
