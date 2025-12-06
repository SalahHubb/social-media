import React from "react";
import { assets } from "../assets/assets";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-hot-toast";

const CreatePost = () => {
  const { backendUrl, setPosts, mainUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { getToken } = useAuth();

  const handleCreatePost = async () => {
    try {
      if (!text) {
        toast.error("Please type something");
        return;
      }

      const formData = new FormData();

      formData.append("text", text);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const token = await getToken();
      const url = backendUrl + "/api/post/create";

      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setText("");
        setImageFile((prev) => null);
        // add the newly created post to the posts list
        console.log("response data: ", response.data);
        setPosts((prevPosts) => [response.data.post, ...prevPosts]);
      } else {
        console.log("error occurred. server response: ", response.data.message);
      }
    } catch (error) {
      console.log("error in handleCreatePost: ", error.message);
    }
  };

  return (
    <div className="min-h-screen container mx-auto bg-gradient-to-b from-[#F8FAFC] to-white py-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-2xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-[#0F172B] leading-9 mb-2 font-['Outfit']">
            Create a New Post
          </h1>
          <p className="text-base text-[#45556C] leading-6 font-['Outfit']">
            Share your thoughts and connect with others
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <div className="flex gap-2">
            <img
              src={mainUser?.imageUrl || assets.sample_profile}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-[#0F172B] font-['Outfit']">
                {mainUser?.firstName} {mainUser?.lastName}
              </p>
              <p className="text-xs text-[#6B7280] font-['Outfit']">
                {mainUser?.username}
              </p>
            </div>
          </div>

          <textarea
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 mt-4 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-transparent"
          ></textarea>

          {/* selected image preview */}

          <div className="my-4">
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="image preview"
                className="w-12 h-12"
              />
            )}
          </div>

          <div className="my-4 border-gray-200 border-t"></div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <label htmlFor="image">
                <ImagePlus className="cursor-pointer" />
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            <button
              className="bg-[#615FFF] text-white py-1 px-6 rounded-md"
              onClick={handleCreatePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
