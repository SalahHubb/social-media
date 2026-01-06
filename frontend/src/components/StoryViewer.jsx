import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { assets } from "../assets/assets";

const StoryViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stories, users, mainUser } = useContext(AuthContext);
  const [story, setStory] = useState(null);
  const [author, setAuthor] = useState({});
  const [progress, setProgress] = useState(0);

  // load story from context (fallback: find by id or _id)
  useEffect(() => {
    const s = stories.find((st) => st._id === id) || null;
    if (!s) {
      // nothing found -> go back
      navigate(-1);
      return;
    }
    setStory(s);
    const a = users.find((u) => u.clerkId === s.clerkId) || mainUser || {};
    setAuthor(a);
  }, [id, stories, users, mainUser, navigate]);

  // progress timer
  useEffect(() => {
    if (!story) return;

    // i assumed total duration is 5s
    const iv = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev === 0 ? 20 : prev + 20;

        if (newProgress <= 100) {
          return newProgress;
        } else {
          // navigate home after story ends
          clearInterval(iv);
          navigate("/");
          return;
        }
      });
    }, 1000);

    return () => clearInterval(iv);
  }, [story, navigate]);

  if (!story) return null;

  const bgStyle = {
    background: "linear-gradient(180deg,#4F46E5 0%, #9810FA 100%)",
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center text-white"
      style={{ ...bgStyle }}
    >
      {/* dim overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/25">
        <div
          className="h-full bg-white transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* top-left author + close */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-black/30 rounded-full px-3 py-1 hover:opacity-90"
        aria-label="Close story"
      >
        <img
          src={author.imageUrl ?? assets.sample_profile}
          alt={author.firstName ?? "user"}
          className="w-10 h-10 rounded-full object-cover border border-white/30"
        />
        <div className="text-left">
          <div className="text-sm font-semibold">
            {(author.firstName ?? "") +
              (author.lastName ? ` ${author.lastName}` : "")}
          </div>
          <div className="text-[11px] text-white/80">
            {author.username ?? ""}
          </div>
        </div>
      </button>

      {/* main content */}
      <div className="relative z-10 max-w-3xl w-full px-6 py-10">
        {story.text && (
          <div className="bg-black/40 rounded-lg p-6 text-white text-lg leading-relaxed max-h-[70vh] overflow-auto">
            <p>{story.text}</p>
          </div>
        )}

        {!story.text && story.mediaUrl && (
          <div className="w-full h-[70vh] overflow-hidden rounded-lg shadow-lg">
            <img
              src={story.mediaUrl}
              alt="story"
              className="h-full w-full object-contain rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;

// object-cover = fill the container, may crop
// object-contain = fit inside the container(center), may letterbox
