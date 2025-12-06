import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Following = () => {
  const {
    following = [],
    mainUser,
    fetchFollowing,
    unfollowUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mainUser?.clerkId) return;
    fetchFollowing(mainUser.clerkId);
  }, [mainUser]);

  if (!following.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white py-6 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Following</h2>
          <div className="text-gray-500">You're not following anyone yet.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white py-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Following</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {following.map((person) => (
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

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => navigate(`/profile/${person.clerkId}`)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md bg-gradient-to-r from-[#615FFF] to-[#9810FA] text-white text-base hover:opacity-90 transition-opacity"
                >
                  View profile
                </button>

                <button
                  onClick={() =>
                    mainUser && unfollowUser(mainUser.clerkId, person.clerkId)
                  }
                  className="px-4 py-2 rounded-md border border-[#D1D5DC] text-sm text-[#374151] hover:bg-slate-50 transition-colors"
                >
                  Unfollow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Following;
