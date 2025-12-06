import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { assets } from "../assets/assets";

const AUTO_CLOSE_MS = 5000; // total duration for a story

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

    const tickMs = 50;

    const steps = AUTO_CLOSE_MS / tickMs;

    const increment = 100 / steps;

    const iv = setInterval(() => {
      setProgress((p) => {
        const next = p + increment;
        if (next >= 100) {
          clearInterval(iv);
          // small delay to show 100%
          setTimeout(() => navigate(-1), 150);
        }
        return Math.min(100, next);
      });
    }, tickMs);

    return () => {
      clearInterval(iv);
    };
  }, [story, navigate]);

  if (!story) return null;

  const bgStyle = {
    background: "linear-gradient(180deg,#4F46E5 0%, #9810FA 100%)",
  };

  // const bgStyle = story.mediaUrl
  //   ? {
  //       backgroundImage: `url(${story.mediaUrl})`,
  //       backgroundSize: "cover",
  //       backgroundPosition: "center",
  //     }
  //   : { background: "linear-gradient(180deg,#4F46E5 0%, #9810FA 100%)" };

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
          className="h-full bg-white transition-all"
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
          <div className="w-full max-h-[80vh] overflow-hidden rounded-lg shadow-lg">
            <img
              src={story.mediaUrl}
              alt="story"
              className="w-full h-full object-cover max-h-[80vh]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
