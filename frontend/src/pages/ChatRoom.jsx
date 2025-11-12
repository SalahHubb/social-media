import React from "react";
import { assets } from "../assets/assets";
import { SendHorizontal } from "lucide-react";
import { ImagePlus } from "lucide-react";

const messages = [
  {
    sender: "John Warren",
    content: "Hey! How are you?",
    timestamp: "10:00 AM",
  },
  {
    receiver: "alex",
    content: "Hey! I'm good, thanks!",
    timestamp: "10:01 AM",
  },
  { sender: "John Warren", content: "What about you?", timestamp: "10:02 AM" },
  {
    receiver: "alex",
    content: "Doing well! Just working on a project.",
    timestamp: "10:03 AM",
  },
  {
    sender: "John Warren",
    content: "That's great to hear.",
    timestamp: "10:04 AM",
  },
  {
    sender: "John Warren",
    content: "Hey! How are you?",
    timestamp: "10:00 AM",
  },
  {
    receiver: "alex",
    content: "Hey! I'm good, thanks!",
    timestamp: "10:01 AM",
  },
  {
    sender: "John Warren",
    content: "Hey! How are you?",
    timestamp: "10:00 AM",
  },
  {
    receiver: "alex",
    content: "Hey! I'm good, thanks!",
    timestamp: "10:01 AM",
  },
];

const ChatRoom = () => {
  return (
    <div className="h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-12 z-0">
      <div className="container mx-auto relative">
        {/* Header */}
        <div className="flex gap-2 p-6 bg-slate-100 rounded-sm ">
          <img
            src={assets.sample_profile}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium">John Warren</span>
            <span className="text-sm text-gray-500">@john_warren</span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[90vh] overflow-y-auto p-8 no-scrollbar">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`w-fit max-w-xs rounded-md md:max-w-md lg:max-w-lg  ${
                  msg.sender ? "self-start" : "self-end"
                } `}
              >
                <p className="bg-white p-2 rounded-lg w-fit max-w-full">
                  {msg.content}
                </p>
                <p className="text-xs text-gray text-right mt-1">
                  {msg.timestamp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-[50%] translate-x-[-50%] m-4 p-3 bg-white rounded-full flex justify-between  md:w-[50%] lg:mx-auto">
          <input
            type="text"
            placeholder="Type a message..."
            className="outline-hidden flex-1 lg:px-4"
          />
          <div className="flex items-center gap-3">
            <div>
              <label htmlFor="image">
                <ImagePlus className="cursor-pointer" />
              </label>
              <input type="file" name="" id="image" className="hidden" />
            </div>
            <div className="ml-2 p-1  rounded-full bg-[#615FFF]">
              <SendHorizontal color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
