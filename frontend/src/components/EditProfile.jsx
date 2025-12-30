import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

const EditProfile = ({ open, onClose }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState(user?.imageUrl);
  const { backendUrl } = useContext(AuthContext);

  const updateUserProfile = async () => {
    onClose();

    try {
      // update clerk user data
      await user.update({
        firstName,
      }); // enable username update in clerk dashboard & use updateUser() method

      // update custom user data
      const token = await getToken();
      const response = await axios.post(
        backendUrl + "/api/user/update-profile",
        { bio, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      setBio("");
      setLocation("");
      setUsername("");
      setFirstName("");
    } catch (error) {
      console.log("error updating user profile: ", error.message);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 bg-black/50 flex justify-center md:py-4">
      <div className="bg-white w-full max-w-[40%] h-full rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        {/* profile picture */}
        <div className="mb-4 flex-col gap-2">
          <p>Profile picture</p>
          <img
            src={profilePicture}
            alt="profile picture"
            className="w-15 h-15 rounded-full"
          />
        </div>

        {/* cover post */}
        <div className="mb-4">
          <p>Cover Post</p>
          <img
            src={assets.sample_cover}
            alt="cover post"
            className="rounded-md object-cover w-[60%] h-45 mt-2"
          />
        </div>

        {/* user details */}
        <div className="flex flex-col gap-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Bio</label>
          <textarea
            type="text"
            className="border border-gray-300 rounded-md"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Location</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="w-full flex justify-end mt-2">
          <div>
            <button
              onClick={onClose}
              className="rounded-md px-4 py-2 border border-gay-300 hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#615FFF] to-[#9810FA] text-white ml-2 hover:cursor-pointer"
              onClick={updateUserProfile}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
