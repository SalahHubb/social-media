import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { SendHorizontal } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { messages, input, setInput, scrollRef, sendMessage, selectedUser } =
    useContext(AuthContext);

  return (
    <div className="h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-12 z-0">
      <div className="container mx-auto relative">
        {/* Header */}
        <div className="flex gap-2 p-6 bg-slate-100 rounded-sm ">
          <img
            src={selectedUser && selectedUser.imageUrl}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium">
              {selectedUser && selectedUser.firstName}
            </span>
            <span className="text-sm text-gray-500">
              {selectedUser && selectedUser.username}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[90vh] overflow-y-auto p-8 no-scrollbar">
          <div className="flex flex-col gap-4">
            {messages &&
              messages.length > 0 &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`w-fit max-w-xs rounded-md md:max-w-md lg:max-w-lg  ${
                    index % 2 === 0 ? "self-start" : "self-end"
                  } `}
                  ref={index === messages.length - 1 ? scrollRef : null}
                >
                  <p className="bg-white p-2 rounded-lg w-fit max-w-full">
                    {msg.content}
                  </p>
                  <p className="text-xs text-gray text-right mt-1">
                    {/* we can use timestamps here*/}
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <div>
              <label htmlFor="image">
                <ImagePlus className="cursor-pointer" />
              </label>
              <input type="file" name="" id="image" className="hidden" />
            </div>
            <div
              className="ml-2 p-1  rounded-full bg-[#615FFF]"
              onClick={() => sendMessage()}
            >
              <SendHorizontal color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
