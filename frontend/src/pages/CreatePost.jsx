import React from "react";
import { assets } from "../assets/assets";
import { ImagePlus } from "lucide-react";

const CreatePost = () => {
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
              src={assets.sample_profile}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-[#0F172B] font-['Outfit']">
                John Warren
              </p>
              <p className="text-xs text-[#6B7280] font-['Outfit']">
                @john_warren
              </p>
            </div>
          </div>

          <textarea
            rows="4"
            placeholder="What's on your mind?"
            className="w-full p-4 mt-4 border border-[#D1D5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-transparent"
          ></textarea>

          <div className="my-4 border-gray-200 border-t"></div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <label htmlFor="image">
                <ImagePlus className="cursor-pointer" />
              </label>
              <input type="file" name="" id="image" className="hidden" />
            </div>

            <button className="bg-[#615FFF] text-white py-1 px-6 rounded-md">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
