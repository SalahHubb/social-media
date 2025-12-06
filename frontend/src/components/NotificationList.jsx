import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

const NotificationList = () => {
  const navigate = useNavigate();
  const {
    notifications = [],
    setNotifications,
    user,
    users,
    fetchUsers,
    setSelectedUser,
  } = useContext(AuthContext);

  // notification shape: {clerkId, name, imageUrl, count, lastMessage, lastTime }

  console.log("Notifications:", notifications);

  const openChatFor = async (clerkId) => {
    // find user object in local list; if missing, refresh users then find
    let target = users.find((u) => u.clerkId === clerkId);
    if (!target) {
      try {
        await fetchUsers(); // refresh users in context
      } catch (e) {
        /* ignore */
      }
      target = users.find((u) => u.clerkId === clerkId);
    }

    if (target) {
      setSelectedUser(target);
      // remove notification for this user
      setNotifications((prev) => prev.filter((n) => n.clerkId !== clerkId));
      navigate("/chat");
    }
  };

  if (!notifications.length) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <h3 className="text-xs font-semibold text-[#1D293D] mb-4">
          Recent Messages
        </h3>
        <div className="text-sm text-gray-500">No new messages</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h3 className="text-xs font-semibold text-[#1D293D] mb-4">
        Recent Messages
      </h3>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.clerkId}
            onClick={() => openChatFor(n.clerkId)}
            className="flex items-start gap-2.5 py-1 hover:bg-gray-50 -mx-2 px-2 rounded cursor-pointer transition-colors"
          >
            <img
              src={n.imageUrl}
              alt={n.name}
              className="w-8 h-8 rounded-full shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <p className="text-xs font-medium text-[#1D293D] truncate">
                  {n.name}
                </p>
                <span className="text-[10px] text-[#90A1B9] shrink-0">
                  {n.lastTime ? new Date(n.lastTime).toLocaleTimeString() : ""}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-[#6A7282] truncate">
                  {n.lastMessage}
                </p>
                {n.count > 0 && (
                  <span className="shrink-0 w-4 h-4 rounded-full bg-[#615FFF] text-white text-[10px] flex items-center justify-center">
                    {n.count}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
