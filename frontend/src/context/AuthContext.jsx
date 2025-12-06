import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";
const AuthContext = createContext(null);

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AuthProvider = ({ children }) => {
  // ui component related states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateStoryModalOpen, setIsCreateStoryModalOpen] = useState(false);
  const [bgCreateStoryModal, setBgCreateStoryModal] = useState("#4F46E5");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // chat related states
  const [users, setUsers] = useState([]); // List of all users
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [mainUser, setMainUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Who I am chatting with
  const [messages, setMessages] = useState([]); // Chat history
  // notification shape: {clerkId, name, imageUrl, count, lastMessage, lastTime }
  const [notifications, setNotifications] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const [socket, setSocket] = useState(null);

  // connection related states
  const [connections, setConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  // clerk hooks
  const { userId, isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();

  // toggle ui components
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const openCreateStoryModal = () => setIsCreateStoryModalOpen(true);
  const closeCreateStoryModal = () => setIsCreateStoryModalOpen(false);
  const openEditProfile = () => setIsEditProfileOpen(true);
  const closeEditProfile = () => setIsEditProfileOpen(false);

  // 1. On Login: Join Socket & Fetch users
  useEffect(() => {
    if (!(isSignedIn && isLoaded && user)) return;

    toast.success("Welcome " + user.firstName);

    // join socket room using clerk id
    const newSocket = io(backendUrl);
    setSocket(newSocket);
    newSocket.emit("join", user.id);

    //fetch users
    fetchUsers();
    fetchPosts();
    fetchStories();
    fetchConnections(user.id);
    fetchPendingRequests(user.id);
    return () => {
      // cleanup socket on sign-out / unmount
      newSocket.disconnect();
      setSocket(null);
    };
  }, [user, isSignedIn, isLoaded]);

  // 2. Fetch chat history when a user is selected
  useEffect(() => {
    if (!selectedUser || !mainUser) return;

    const loadMessages = async () => {
      const res = await axios.get(
        backendUrl + `/api/message/${mainUser.clerkId}/${selectedUser.clerkId}`
      );

      setMessages(res.data.messages);
    };

    loadMessages();
  }, [selectedUser]);

  // 3. listen for incoming real time message
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (msg) => {
      // If selectedUser exists & message belongs to the active chat → append message
      if (
        selectedUser &&
        user &&
        ((msg.senderId === selectedUser.clerkId &&
          msg.recipientId === user.id) ||
          (msg.senderId === user.id &&
            msg.recipientId === selectedUser.clerkId))
      ) {
        setMessages((prev) => [...prev, msg]);
        return;
      }

      // otherwise -> notification: if i'm the recipient and the messages is not part of the open chat -> create/update  a notification
      if (msg.recipientId === user.id) {
        const senderId = msg.senderId;
        const senderUser = users.find((u) => u.clerkId == senderId);

        const name =
          (senderUser?.firstName || "") + (senderUser?.lastName || "");

        const imageUrl = (senderUser && senderUser.imageUrl) || "";

        setNotifications((prev) => {
          const existing = prev.find((n) => n.clerkId === senderId);

          if (existing) {
            // update count, lastMessage, lastTime
            return prev.map((n) =>
              n.clerkId === senderId
                ? {
                    clerkId: senderId,
                    count: (n.count || 0) + 1,
                    lastMessage: msg.content,
                    lastTime: new Date().toISOString(),
                    name,
                    imageUrl,
                  }
                : n
            );
          }
          // create a new notification
          return [
            ...prev,
            {
              clerkId: senderId,
              name,
              imageUrl,
              count: 1,
              lastMessage: msg.content,
              lastTime: new Date().toISOString(),
            },
          ];
        });
      }
    };

    socket.on("receiveMessage", handleMessage);

    return () => socket.off("receiveMessage", handleMessage);
  }, [selectedUser, socket, users, user]);

  // clear notifications for currently opened chat or if there's selectedUser user to chat
  useEffect(() => {
    if (!selectedUser) return;

    setNotifications((prev) =>
      prev.filter((n) => n.clerkId !== selectedUser.clerkId)
    );
  }, [selectedUser]);

  // 4. Send Message
  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;

    // Emit to Socket Server
    socket.emit("privateMessage", {
      senderId: user.id,
      recipientId: selectedUser.clerkId,
      content: input,
    });

    setInput("");
  };

  // 5. Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/user/list");
      setMainUser(res.data.users.find((u) => u.clerkId === user.id));
      setUsers(res.data.users.filter((u) => u.clerkId !== user.id)); // Filter out myself using clerk id
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/post/list");
      setPosts(res.data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
    }
  };

  const fetchStories = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/story/list");
      setStories(res.data.stories);
    } catch (err) {
      console.error("Error fetching stories:", err.message);
    }
  };

  // ---End Chat functions ---

  // ---- Connections functions ----

  // 1. fetch pending requests for main user (recipient)
  const fetchPendingRequests = async (clerkId) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/connection/pending/${clerkId}`
      );
      console.log("pending users: ", res.data.pendingUsers);
      setPendingRequests(res.data.pendingUsers || []);
    } catch (err) {
      console.error("fetchPendingRequests err:", err.message);
    }
  };

  // 2. fetch accepted connections for a user
  const fetchConnections = async (clerkId) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/connection/list/${clerkId}`
      );
      console.log("connections: ", res.data.connections);
      setConnections(res.data.connections || []);
    } catch (err) {
      console.error("fetchConnections err:", err.message);
    }
  };

  // 3. send connection request
  const sendConnectionRequest = async (requesterId, recipientId) => {
    try {
      const res = await axios.post(`${backendUrl}/api/connection/request`, {
        requesterId,
        recipientId,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Request sent");
      } else {
        toast.error(res.data.message || "Failed to send request");
      }
    } catch (err) {
      console.error("sendConnectionRequest err:", err.message);
    }
  };

  // 4. respond to connection request
  const respondToConnectionRequest = async (
    requesterId,
    recipientId,
    action
  ) => {
    try {
      const res = await axios.post(`${backendUrl}/api/connection/respond`, {
        requesterId,
        recipientId,
        action,
      });

      console.log(res.data);
      if (res.data.success) {
        toast.success(`Request ${action}ed`);
      } else {
        toast.error(res.data.message || "Failed to respond to request");
      }
    } catch (err) {
      console.error("respondToConnectionRequest err:", err.message);
    }
  };

  // 5. follow user
  const followUser = async (followerId, targetUserId) => {
    if (!mainUser) return;

    try {
      // UI update: add targetUserId to mainUser.following
      setMainUser((prev) =>
        prev
          ? {
              ...prev,
              following: Array.from(
                new Set([...(prev.following || []), targetUserId])
              ),
            }
          : prev
      );

      // update users list: increment/add follower on target user
      setUsers((prev) =>
        prev.map((u) =>
          u.clerkId === targetUserId
            ? {
                ...u,
                followers: Array.from(
                  new Set([...(u.followers || []), followerId])
                ),
              }
            : u
        )
      );

      // backend call to follow user
      const res = await axios.post(`${backendUrl}/api/user/follow`, {
        followerId,
        targetUserId,
      });

      console.log(res.data);
      if (res.data.success) {
        toast.success("Followed");
        // refresh follower/following lists to ensure consistency
        fetchFollowers(mainUser.clerkId);
        fetchFollowing(mainUser.clerkId);
      } else {
        // revert UI update on failure
        setMainUser((prev) =>
          prev
            ? {
                ...prev,
                following: (prev.following || []).filter(
                  (id) => id !== targetUserId
                ),
              }
            : prev
        );
        setUsers((prev) =>
          prev.map((u) =>
            u.clerkId === targetUserId
              ? {
                  ...u,
                  followers: (u.followers || []).filter(
                    (id) => id !== followerId
                  ),
                }
              : u
          )
        );
        toast.error(res.data.message || "Failed to follow user");
      }
    } catch (err) {
      // revert optimistic UI update on error
      setMainUser((prev) =>
        prev
          ? {
              ...prev,
              following: (prev.following || []).filter(
                (id) => id !== targetUserId
              ),
            }
          : prev
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.clerkId === targetUserId
            ? {
                ...u,
                followers: (u.followers || []).filter(
                  (id) => id !== followerId
                ),
              }
            : u
        )
      );
      console.error("followUser err:", err.message);
    }
  };

  // 6. unfollow user
  const unfollowUser = async (followerId, targetUserId) => {
    if (!mainUser) return;
    try {
      // UI update: remove targetUserId from mainUser.following
      setMainUser((prev) =>
        prev
          ? {
              ...prev,
              following: (prev.following || []).filter(
                (id) => id !== targetUserId
              ),
            }
          : prev
      );

      // update users list: decrement/remove follower from target user
      setUsers((prev) =>
        prev.map((u) =>
          u.clerkId === targetUserId
            ? {
                ...u,
                followers: (u.followers || []).filter(
                  (id) => id !== followerId
                ),
              }
            : u
        )
      );

      // backend call to unfollow user
      const res = await axios.post(`${backendUrl}/api/user/unfollow`, {
        followerId,
        targetUserId,
      });

      console.log(res.data);
      if (res.data.success) {
        toast.success("User unfollowed");
        fetchFollowers(mainUser.clerkId);
        fetchFollowing(mainUser.clerkId);
      } else {
        // revert UI update on failure
        setMainUser((prev) =>
          prev
            ? {
                ...prev,
                following: Array.from(
                  new Set([...(prev.following || []), targetUserId])
                ),
              }
            : prev
        );
        setUsers((prev) =>
          prev.map((u) =>
            u.clerkId === targetUserId
              ? {
                  ...u,
                  followers: Array.from(
                    new Set([...(u.followers || []), followerId])
                  ),
                }
              : u
          )
        );
        toast.error(res.data.message || "Failed to unfollow user");
      }
    } catch (err) {
      // revert optimistic UI update on error
      setMainUser((prev) =>
        prev
          ? {
              ...prev,
              following: Array.from(
                new Set([...(prev.following || []), targetUserId])
              ),
            }
          : prev
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.clerkId === targetUserId
            ? {
                ...u,
                followers: Array.from(
                  new Set([...(u.followers || []), followerId])
                ),
              }
            : u
        )
      );
      console.error("unfollowUser err:", err.message);
    }
  };

  // 7. get followers
  const fetchFollowers = async (clerkId) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/user/${clerkId}/followers`
      );
      console.log(res.data.followers);
      setFollowers(res.data.followers || []);
    } catch (err) {
      console.error("fetchFollowers err:", err.message);
    }
  };

  // 8. get following
  const fetchFollowing = async (clerkId) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/user/${clerkId}/following`
      );
      console.log(res.data.following);
      setFollowing(res.data.following || []);
    } catch (err) {
      console.error("fetchFollowing err:", err.message);
    }
  };

  // ---- End Connections functions ----

  const value = {
    user,
    isSignedIn,
    notifications,
    setNotifications,
    isMobileMenuOpen,
    toggleMobileMenu,
    isCreateStoryModalOpen,
    openCreateStoryModal,
    closeCreateStoryModal,
    bgCreateStoryModal,
    setBgCreateStoryModal,
    isEditProfileOpen,
    openEditProfile,
    closeEditProfile,
    backendUrl,
    messages,
    sendMessage,
    input,
    setInput,
    users,
    scrollRef,
    selectedUser,
    mainUser,
    setSelectedUser,
    posts,
    setPosts,
    stories,
    setStories,
    sendConnectionRequest,
    fetchPendingRequests,
    fetchConnections,
    respondToConnectionRequest,
    connections,
    pendingRequests,
    followUser,
    unfollowUser,
    fetchFollowers,
    fetchFollowing,
    followers,
    following,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
