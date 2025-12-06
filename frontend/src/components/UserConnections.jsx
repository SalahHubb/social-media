import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const UserConnections = () => {
  const {
    connections = [],
    users = [],
    mainUser,
    fetchConnections,
    setSelectedUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mainUser?.clerkId) return;
    fetchConnections(mainUser.clerkId);
  }, [mainUser]);

  if (!connections.length) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Connections</h2>
        <div className="text-gray-500">You have no connections yet.</div>
      </div>
    );
  }

  const handleMessage = (clerkId) => {
    // find the user object from users list first, fallback to connection entry
    const selected =
      users.find((u) => u.clerkId === clerkId) ||
      connections.find((c) => c.clerkId === clerkId);
    if (selected) {
      setSelectedUser(selected);
      navigate("/chat");
    } else {
      // If user object not available locally, navigate to profile as fallback
      navigate(`/profile/${clerkId}`);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Your Connections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((person) => (
          <div
            key={person._id ?? person.clerkId}
            className="bg-white rounded-md border border-[#E5E7EB] shadow-sm p-6 flex flex-col items-center"
          >
            <img
              src={person.imageUrl || ""}
              alt={person.firstName}
              className="w-16 h-16 rounded-full shadow-md mb-4 object-cover"
            />

            <div className="text-center mb-3">
              <h3 className="text-base font-semibold text-black">
                {person.firstName} {person.lastName}
              </h3>
              <p className="text-sm text-[#6A7282]">{person.username}</p>
            </div>

            <p className="text-sm text-[#4A5565] text-center leading-5 mb-6 line-clamp-3">
              {person.bio || "No bio available."}
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => navigate(`/profile/${person.clerkId}`)}
                className="flex-1 py-2.5 rounded-md bg-gradient-to-r from-[#615FFF] to-[#9810FA] text-white hover:opacity-90"
              >
                View profile
              </button>

              <button
                onClick={() => handleMessage(person.clerkId)}
                className="px-4 py-2 rounded-md border border-[#D1D5DC] text-sm text-[#374151] hover:bg-slate-50"
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserConnections;
