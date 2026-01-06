import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Upload } from "lucide-react";
import { TextAlignStart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const CreateStoryModal = ({ open, onClose }) => {
  if (!open) return null;

  const {
    bgCreateStoryModal,
    setBgCreateStoryModal,
    backendUrl,
    fetchStories,
  } = useContext(AuthContext);

  const { getToken } = useAuth();
  const [text, setText] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [storyType, setStoryType] = useState("text");

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Cleanup function: revoke the object URL when the component unmounts
    // or when selectedFile changes to prevent memory leaks.
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleColorPick = (color) => {
    setBgCreateStoryModal(color);
  };

  const uploadMedia = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("media", file);

    try {
      const token = await getToken();
      const resp = await axios.post(`${backendUrl}/api/story/media`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Story uploaded");
      return resp.data;
    } catch (err) {
      console.error("media upload error", err);
      toast.error("Upload failed");
      throw err;
    }
  };

  const uploadText = async () => {
    if (!text) {
      toast.error("Please type something first");
      return;
    }

    try {
      const token = await getToken();
      const resp = await axios.post(
        `${backendUrl}/api/story/text`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Story posted");
      return resp.data;
    } catch (err) {
      console.error("text upload error", err);
      toast.error("Post failed");
      throw err;
    }
  };

  const handleCreateStory = async () => {
    onClose();

    if (storyType === "media") {
      await uploadMedia();
    } else {
      await uploadText();
    }

    await fetchStories();

    // reset local states
    setFile(null);
    setText(null);
    setPreviewUrl(null);
  };

  return (
    // overlay
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 sm:p-12"
      aria-modal="true"
      role="dialog"
    >
      {/* Card container */}
      <div
        className="relative w-full max-w-xl md:max-w-md lg:max-w-md"
        style={{ width: 448 }}
      >
        {/* Card box */}
        <div
          className="relative bg-transparent"
          style={{
            // we keep the exact height as in design but allow responsive shrink
            minHeight: 600,
          }}
        >
          {/* Top-left chevron (arrow) */}
          <button
            aria-label="Back"
            onClick={onClose}
            className="absolute left-2 top-2 w-8 h-8 rounded-full flex items-center justify-center hover:cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M12 19L5 12L12 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12H5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Center title */}
          <div className="absolute left-0 right-0 top-2 flex items-center justify-center pointer-events-none">
            <h3 className="text-white font-semibold text-lg">Create Story</h3>
          </div>

          {/* Color dots (stacked horizontally) */}
          <div
            className="absolute left-0 top-56 flex gap-3 items-center hover:cursor-pointer"
            style={{ top: 456 }}
          >
            <span
              className="w-6 h-6 rounded-full bg-[#4F46E5] ring-1 ring-white"
              onClick={() => handleColorPick("#4F46E5")}
            />
            <span
              className="w-6 h-6 rounded-full bg-[#7C3AED] ring-1 ring-white"
              onClick={() => handleColorPick("#7C3AED")}
            />
            <span
              className="w-6 h-6 rounded-full bg-[#DB2777] ring-1 ring-white"
              onClick={() => handleColorPick("#DB2777")}
            />
            <span
              className="w-6 h-6 rounded-full bg-[#E11D48] ring-1 ring-white"
              onClick={() => handleColorPick("#E11D48")}
            />
            <span
              className="w-6 h-6 rounded-full bg-[#CA8A04] ring-1 ring-white"
              onClick={() => handleColorPick("#CA8A04")}
            />
            <span
              className="w-6 h-6 rounded-full bg-[#0D9488] ring-1 ring-white"
              onClick={() => handleColorPick("#0D9488")}
            />
          </div>

          {/* Row of action buttons (left) and label (right) */}
          <div className="absolute left-0 top-[496px] flex gap-6 w-full ">
            {/* White button with icon + text */}
            <button
              className={`flex items-center justify-center gap-2 flex-1 h-10 rounded-md hover:cursor-pointer ${
                storyType == "text" ? "bg-white" : "bg-[#27272A]"
              }`}
              type="button"
              onClick={() => setStoryType("text")}
            >
              <TextAlignStart
                color={` ${storyType == "text" ? "black" : "white"}`}
              />
              <span
                className={`text-sm ${
                  storyType == "text" ? "text-black" : "text-white"
                }`}
              >
                Text
              </span>
            </button>

            {/* photo/video */}
            <div onClick={() => setStoryType("media")}>
              <label htmlFor="imgVideo">
                <div
                  className={`flex items-center justify-center gap-2 flex-1 h-10 rounded-md hover:cursor-pointer ${
                    storyType == "media" ? "bg-white" : "bg-[#27272A]"
                  }`}
                >
                  <Upload
                    color={`${storyType == "media" ? "black" : "white"}`}
                  />
                  <span
                    className={`text-sm ${
                      storyType == "media" ? "text-black" : "text-white"
                    }`}
                  >
                    Photo/Video
                  </span>
                </div>
              </label>
              <input
                type="file"
                id="imgVideo"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          {/* Gradient CTA button (full width of card) */}
          <div
            className="absolute left-0 right-0 rounded-md h-12 flex items-center justify-center"
            style={{
              left: 0,
              top: 552,
              background: "linear-gradient(90deg,#615FFF 0%,#9810FA 100%)",
            }}
          >
            <button className="flex items-center gap-2 w-full h-full justify-center text-white font-normal hover:cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M7.45356 11.625C7.3866 11.3655 7.25131 11.1286 7.06177 10.939C6.87223 10.7495 6.63536 10.6142 6.37581 10.5473L1.77456 9.36075C1.69606 9.33847 1.62697 9.29119 1.57777 9.22609C1.52857 9.16098 1.50195 9.08161 1.50195 9C1.50195 8.9184 1.52857 8.83902 1.57777 8.77392C1.62697 8.70882 1.69606 8.66154 1.77456 8.63925L6.37581 7.452C6.63527 7.38511 6.87208 7.24993 7.06161 7.06053C7.25114 6.87113 7.38648 6.63442 7.45356 6.375L8.64006 1.77375C8.66212 1.69494 8.70935 1.62551 8.77455 1.57605C8.83975 1.52659 8.91934 1.49982 9.00118 1.49982C9.08302 1.49982 9.16262 1.52659 9.22782 1.57605C9.29302 1.62551 9.34025 1.69494 9.36231 1.77375L10.5481 6.375C10.615 6.63456 10.7503 6.87143 10.9398 7.06097C11.1294 7.25051 11.3663 7.3858 11.6258 7.45275L16.2271 8.6385C16.3062 8.66033 16.376 8.70751 16.4257 8.77281C16.4754 8.83811 16.5023 8.91792 16.5023 9C16.5023 9.08208 16.4754 9.1619 16.4257 9.2272C16.376 9.2925 16.3062 9.33968 16.2271 9.3615L11.6258 10.5473C11.3663 10.6142 11.1294 10.7495 10.9398 10.939C10.7503 11.1286 10.615 11.3655 10.5481 11.625L9.36156 16.2263C9.3395 16.3051 9.29227 16.3745 9.22707 16.424C9.16187 16.4734 9.08227 16.5002 9.00043 16.5002C8.9186 16.5002 8.839 16.4734 8.7738 16.424C8.7086 16.3745 8.66136 16.3051 8.63931 16.2263L7.45356 11.625Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base" onClick={handleCreateStory}>
                Create Story
              </span>
            </button>
          </div>

          {/* Purple background card area (top-left of the card) */}
          <div
            className="absolute left-0 top-14 rounded-lg p-6"
            style={{
              width: 448,
              height: 384,
              background: [bgCreateStoryModal],
              left: 0,
              top: 56,
            }}
          >
            {/* inner textarea area */}
            <div className="relative w-full h-full">
              {storyType === "text" ? (
                <textarea
                  className="resize-none w-full h-full bg-transparent outline-none text-white placeholder-white/50 p-0"
                  placeholder="What's on your mind?"
                  aria-label="What's on your mind?"
                  style={{ paddingLeft: 24, paddingTop: 24 }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              ) : // show the image or video preview from input element before submitting
              file ? (
                file.type.startsWith("image/") ? (
                  <img
                    src={previewUrl}
                    className="resize-none w-full h-full object-cover"
                    alt="preview"
                  />
                ) : (
                  <video
                    src={previewUrl}
                    className="resize-none w-full h-full object-cover"
                    controls
                  />
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;
