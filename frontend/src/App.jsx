import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";
import Feed from "./pages/Feed.jsx";
import Messages from "./pages/Messages.jsx";
import Connections from "./pages/Connections.jsx";
import Discover from "./pages/Discover.jsx";
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import ChatRoom from "./pages/ChatRoom.jsx";
import Followers from "./components/Followers.jsx";
import Following from "./components/Following.jsx";
import Pending from "./components/Pending.jsx";
import UserConnections from "./components/UserConnections.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<Home />}>
          <Route index element={<Feed />} />
          <Route path={"feed"} element={<Feed />} />
          <Route path={"messages"} element={<Messages />} />
          <Route path={"connections"} element={<Connections />} />
          <Route path={"discover"} element={<Discover />} />
          <Route path={"connections"} element={<Connections />}>
            <Route path={"followers"} element={<Followers />} />
            <Route path={"following"} element={<Following />} />
            <Route path={"pending"} element={<Pending />} />
            <Route path={"user-connections"} element={<UserConnections />} />
          </Route>
          <Route path={"profile"} element={<Profile />} />
          <Route path={"create-post"} element={<CreatePost />} />
          <Route path={"chat"} element={<ChatRoom />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
