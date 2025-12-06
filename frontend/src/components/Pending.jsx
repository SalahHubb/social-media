import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Pending = () => {
  const {
    pendingRequests = [],
    mainUser,
    fetchPendingRequests,
    respondToConnectionRequest,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mainUser?.clerkId) return;
    fetchPendingRequests(mainUser.clerkId);
  }, [mainUser]);

  const handleRespond = async (requesterId, recipientId, action) => {
    await respondToConnectionRequest(requesterId, recipientId, action);
    // refresh list
    fetchPendingRequests(mainUser.clerkId);
  };

  if (!pendingRequests.length) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
        <div className="text-gray-500">No pending connection requests.</div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-bold">Pending Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingRequests.map((r) => {
          return (
            <div
              key={r._id ?? r.clerkId}
              className="bg-white rounded-md border border-[#E5E7EB] shadow-sm p-6 flex flex-col items-center"
            >
              <img
                src={r.imageUrl || ""}
                alt={r.firstName}
                className="w-16 h-16 rounded-full shadow-md mb-4 object-cover"
              />

              <div className="text-center mb-3">
                <h3 className="text-base font-semibold text-black">
                  {r.firstName} {r.lastName}
                </h3>
                <p className="text-sm text-[#6A7282]">{r.username}</p>
              </div>

              <p className="text-sm text-[#4A5565] text-center leading-5 mb-6 line-clamp-3">
                {r.bio || "No bio available."}
              </p>

              <div className="flex justify-between items-start gap-2 w-full">
                <button
                  onClick={() => navigate(`/profile/${r.clerkId}`)}
                  className=" px-[2px] py-1 rounded-md bg-gradient-to-r from-[#615FFF] to-[#9810FA] text-white hover:opacity-90"
                >
                  View profile
                </button>

                <button
                  onClick={() =>
                    handleRespond(r.clerkId, mainUser.clerkId, "accept")
                  }
                  className="px-[2px] py-1 rounded-md bg-green-600 text-white hover:opacity-90"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleRespond(r.clerkId, mainUser.clerkId, "reject")
                  }
                  className="px-[2px] py-1 rounded-md border border-red-100 text-red-600 hover:bg-red-50"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pending;
