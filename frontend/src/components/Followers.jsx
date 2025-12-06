import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Followers = () => {
  const { followers = [], mainUser, fetchFollowers } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mainUser?.clerkId) return;
    fetchFollowers(mainUser.clerkId);
  }, [mainUser]);

  if (!followers.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white py-6 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Followers</h2>
          <div className="text-gray-500">You have no followers yet.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white py-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Followers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {followers.map((person) => (
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

              <p className="text-sm text-[#4A5565] text-center leading-5 mb-6 whitespace-pre-line line-clamp-3">
                {person.bio || "No bio available."}
              </p>

              <div className="w-full">
                <button
                  onClick={() => navigate(`/profile/${person.clerkId}`)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-gradient-to-r from-[#615FFF] to-[#9810FA] text-white text-base hover:opacity-90 transition-opacity"
                >
                  View profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followers;
// ...existing code...
