import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const { openEditProfile } = useContext(AuthContext);

  const posts = [
    {
      id: 1,
      text: "We're a small #team with a big vision — working day and night to turn dreams into products, and #products into something people love.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/dcb0ab7d24503e59eab05f7fdda1e3e6424ff5ca?width=1280",
      timestamp: "9 days ago",
      likes: 0,
      comments: 12,
      shares: 7,
    },
    {
      id: 2,
      text: "Unlock your potential—every small step counts. Stay consistent, stay focused, and trust the process. Growth takes time, but every day is a new chance to be better than yesterday. 🌱✨",
      hashtags:
        "#Motivation #GrowthMindset #DailyInspiration #StayFocused #LevelUp #PositiveVibes #KeepGoing #SelfImprovement #MindsetMatters #SuccessJourney",
      timestamp: "16 days ago",
      likes: 0,
      comments: 12,
      shares: 7,
    },
    {
      id: 3,
      text: "This is a sample paragraph with some #hashtags like #socialmedia and #marketing. Let's find them!",
      timestamp: "16 days ago",
      likes: 0,
      comments: 12,
      shares: 7,
    },
    {
      id: 4,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/9e143b7832c9795ce71972704a2a1dbf5518e644?width=1280",
      timestamp: "16 days ago",
      likes: 1,
      comments: 12,
      shares: 7,
    },
    {
      id: 5,
      text: "Finally , got the car !",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/a0d467208bad46350ea13d1a96d5b2164c2bacfa?width=1280",
      timestamp: "16 days ago",
      likes: 0,
      comments: 12,
      shares: 7,
    },
    {
      id: 6,
      text: "Hello, Everyone this is my first Post",
      timestamp: "16 days ago",
      likes: 0,
      comments: 12,
      shares: 7,
    },
  ];

  const renderPostText = (text, hashtags) => {
    if (!text && !hashtags) return null;

    const fullText = [text, hashtags].filter(Boolean).join("\n\n");
    const parts = fullText.split(/(#\w+)/g);

    return (
      <p className="text-sm text-[#1E2939] leading-5 mb-4 font-['Outfit'] whitespace-pre-line">
        {parts.map((part, index) =>
          part.startsWith("#") ? (
            <span key={index} className="text-[#4F39F6]">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <div className="relative h-56">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C6D2FF] via-[#E9D4FF] to-[#FCCEE8]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/8d3874a960a32b4d295a73686827b8a5e138dca1?width=1318"
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative px-8 pb-6">
            <div className="absolute -top-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/1de2379a40be4f000180511867fc8fead9872c75?width=240"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="pt-20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-[#101828] font-['Outfit']">
                    John Warren
                  </h1>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.85019 8.62001C3.70423 7.96253 3.72665 7.27885 3.91535 6.63235C4.10405 5.98584 4.45294 5.39745 4.92966 4.92173C5.40638 4.446 5.9955 4.09835 6.6424 3.911C7.2893 3.72365 7.97303 3.70267 8.63019 3.85001C8.9919 3.28431 9.4902 2.81876 10.0791 2.49629C10.6681 2.17382 11.3287 2.00479 12.0002 2.00479C12.6716 2.00479 13.3323 2.17382 13.9212 2.49629C14.5102 2.81876 15.0085 3.28431 15.3702 3.85001C16.0284 3.70203 16.7133 3.72292 17.3612 3.91072C18.0091 4.09852 18.599 4.44715 19.076 4.92416C19.5531 5.40117 19.9017 5.99108 20.0895 6.63901C20.2773 7.28694 20.2982 7.97184 20.1502 8.63001C20.7159 8.99171 21.1814 9.49001 21.5039 10.079C21.8264 10.6679 21.9954 11.3286 21.9954 12C21.9954 12.6715 21.8264 13.3321 21.5039 13.9211C21.1814 14.51 20.7159 15.0083 20.1502 15.37C20.2975 16.0272 20.2765 16.7109 20.0892 17.3578C19.9018 18.0047 19.5542 18.5938 19.0785 19.0705C18.6027 19.5473 18.0144 19.8961 17.3679 20.0848C16.7213 20.2736 16.0377 20.296 15.3802 20.15C15.019 20.7179 14.5203 21.1854 13.9303 21.5093C13.3404 21.8332 12.6782 22.0031 12.0052 22.0031C11.3322 22.0031 10.67 21.8332 10.0801 21.5093C9.49011 21.1854 8.99143 20.7179 8.63019 20.15C7.97303 20.2973 7.2893 20.2764 6.6424 20.089C5.9955 19.9017 5.40638 19.554 4.92966 19.0783C4.45294 18.6026 4.10405 18.0142 3.91535 17.3677C3.72665 16.7212 3.70423 16.0375 3.85019 15.38C3.28015 15.0192 2.81061 14.5202 2.48524 13.9292C2.15988 13.3383 1.98926 12.6746 1.98926 12C1.98926 11.3254 2.15988 10.6617 2.48524 10.0708C2.81061 9.47983 3.28015 8.98076 3.85019 8.62001Z"
                      stroke="#2B7FFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="#2B7FFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <button
                  onClick={openEditProfile}
                  className="px-4 py-2.5 rounded-lg border border-[#D1D5DC] text-black text-base font-medium font-['Outfit'] hover:bg-slate-50 transition-colors"
                >
                  Edit
                </button>
              </div>

              <p className="text-base text-[#6A7282] mb-4 font-['Outfit']">
                @john_warren
              </p>

              <p className="text-sm text-[#364153] leading-5 mb-4 font-['Outfit']">
                🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a
                time. ✨ Staying curious. Creating with purpose.
              </p>

              <div className="flex items-center gap-4 mb-6 text-sm text-[#6A7282] font-['Outfit']">
                <div className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3337 6.66668C13.3337 9.99534 9.64099 13.462 8.40099 14.5327C8.28548 14.6195 8.14486 14.6665 8.00033 14.6665C7.85579 14.6665 7.71518 14.6195 7.59966 14.5327C6.35966 13.462 2.66699 9.99534 2.66699 6.66668C2.66699 5.25219 3.2289 3.89563 4.22909 2.89544C5.22928 1.89525 6.58584 1.33334 8.00033 1.33334C9.41481 1.33334 10.7714 1.89525 11.7716 2.89544C12.7718 3.89563 13.3337 5.25219 13.3337 6.66668Z"
                      stroke="#6A7282"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 8.66666C9.10457 8.66666 10 7.77123 10 6.66666C10 5.56209 9.10457 4.66666 8 4.66666C6.89543 4.66666 6 5.56209 6 6.66666C6 7.77123 6.89543 8.66666 8 8.66666Z"
                      stroke="#6A7282"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.33301 1.33334V4.00001"
                      stroke="#6A7282"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.667 1.33334V4.00001"
                      stroke="#6A7282"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.6667 2.66666H3.33333C2.59695 2.66666 2 3.26361 2 3.99999V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V3.99999C14 3.26361 13.403 2.66666 12.6667 2.66666Z"
                      stroke="#6A7282"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 6.66666H14"
                      stroke="#6A7282"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Joined</span>
                  <span className="font-medium">16 days ago</span>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-[#E5E7EB]">
                <div>
                  <span className="text-xl font-bold text-[#101828] font-['Outfit']">
                    6
                  </span>
                  <span className="text-sm text-[#6A7282] ml-2 font-['Outfit']">
                    Posts
                  </span>
                </div>
                <div>
                  <span className="text-xl font-bold text-[#101828] font-['Outfit']">
                    2
                  </span>
                  <span className="text-sm text-[#6A7282] ml-2 font-['Outfit']">
                    Followers
                  </span>
                </div>
                <div>
                  <span className="text-xl font-bold text-[#101828] font-['Outfit']">
                    2
                  </span>
                  <span className="text-sm text-[#6A7282] ml-2 font-['Outfit']">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6 px-4 py-2 flex items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-['Outfit'] transition-colors ${
              activeTab === "posts"
                ? "bg-[#4F39F6] text-white"
                : "text-[#4A5565] hover:bg-slate-50"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-['Outfit'] transition-colors ${
              activeTab === "media"
                ? "bg-[#4F39F6] text-white"
                : "text-[#4A5565] hover:bg-slate-50"
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setActiveTab("likes")}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-['Outfit'] transition-colors ${
              activeTab === "likes"
                ? "bg-[#4F39F6] text-white"
                : "text-[#4A5565] hover:bg-slate-50"
            }`}
          >
            Likes
          </button>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/5286ba02a18fe2d46c4490703e344f01be20b831?width=80"
                  alt="Profile"
                  className="w-10 h-10 rounded-full shadow-sm"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-black font-['Outfit']">
                      John Warren
                    </h3>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5668 5.74666C2.46949 5.30834 2.48443 4.85256 2.61023 4.42155C2.73604 3.99055 2.96863 3.59829 3.28644 3.28114C3.60425 2.96399 3.997 2.73222 4.42827 2.60732C4.85953 2.48242 5.31535 2.46844 5.75346 2.56666C5.9946 2.18953 6.3268 1.87917 6.71943 1.66418C7.11206 1.4492 7.55249 1.33652 8.00013 1.33652C8.44776 1.33652 8.8882 1.4492 9.28083 1.66418C9.67346 1.87917 10.0057 2.18953 10.2468 2.56666C10.6856 2.46801 11.1422 2.48193 11.5741 2.60714C12.0061 2.73234 12.3994 2.96475 12.7174 3.28276C13.0354 3.60077 13.2678 3.99404 13.393 4.42599C13.5182 4.85795 13.5321 5.31455 13.4335 5.75333C13.8106 5.99447 14.121 6.32666 14.3359 6.71929C14.5509 7.11193 14.6636 7.55236 14.6636 7.99999C14.6636 8.44763 14.5509 8.88806 14.3359 9.28069C14.121 9.67333 13.8106 10.0055 13.4335 10.2467C13.5317 10.6848 13.5177 11.1406 13.3928 11.5719C13.2679 12.0031 13.0361 12.3959 12.719 12.7137C12.4018 13.0315 12.0096 13.2641 11.5786 13.3899C11.1476 13.5157 10.6918 13.5306 10.2535 13.4333C10.0126 13.8119 9.68018 14.1236 9.28688 14.3395C8.89358 14.5555 8.45215 14.6687 8.00346 14.6687C7.55478 14.6687 7.11335 14.5555 6.72004 14.3395C6.32674 14.1236 5.99429 13.8119 5.75346 13.4333C5.31535 13.5316 4.85953 13.5176 4.42827 13.3927C3.997 13.2678 3.60425 13.036 3.28644 12.7188C2.96863 12.4017 2.73604 12.0094 2.61023 11.5784C2.48443 11.1474 2.46949 10.6916 2.5668 10.2533C2.18677 10.0128 1.87374 9.68011 1.65683 9.28614C1.43992 8.89216 1.32617 8.44973 1.32617 7.99999C1.32617 7.55026 1.43992 7.10782 1.65683 6.71385C1.87374 6.31988 2.18677 5.98717 2.5668 5.74666Z"
                        stroke="#2B7FFF"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 7.99999L7.33333 9.33332L10 6.66666"
                        stroke="#2B7FFF"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-[#6A7282] font-['Outfit']">
                    @john_warren • {post.timestamp}
                  </p>
                </div>
              </div>

              {renderPostText(post.text, post.hashtags)}

              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full rounded-lg mb-4"
                />
              )}

              <div className="flex items-center gap-6 pt-4 border-t border-[#D1D5DC]">
                <button className="flex items-center gap-2 text-[#4A5565] hover:text-[#4F39F6] transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6663 9.33333C13.6597 8.36 14.6663 7.19333 14.6663 5.66667C14.6663 4.69421 14.28 3.76158 13.5924 3.07394C12.9048 2.38631 11.9721 2 10.9997 2C9.82634 2 8.99967 2.33333 7.99967 3.33333C6.99967 2.33333 6.17301 2 4.99967 2C4.02721 2 3.09458 2.38631 2.40695 3.07394C1.71932 3.76158 1.33301 4.69421 1.33301 5.66667C1.33301 7.2 2.33301 8.36667 3.33301 9.33333L7.99967 14L12.6663 9.33333Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-['Outfit']">{post.likes}</span>
                </button>

                <button className="flex items-center gap-2 text-[#4A5565] hover:text-[#4F39F6] transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.26634 13.3333C6.53873 13.986 8.0024 14.1628 9.3936 13.8318C10.7848 13.5009 12.012 12.6839 12.8542 11.5281C13.6963 10.3723 14.098 8.9538 13.9867 7.5281C13.8755 6.1024 13.2587 4.7633 12.2475 3.75212C11.2364 2.74093 9.89727 2.12416 8.47157 2.01293C7.04587 1.90171 5.62732 2.30335 4.47155 3.14549C3.31579 3.98762 2.4988 5.21486 2.16782 6.60607C1.83684 7.99727 2.01364 9.46094 2.66634 10.7333L1.33301 14.6667L5.26634 13.3333Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-['Outfit']">
                    {post.comments}
                  </span>
                </button>

                <button className="flex items-center gap-2 text-[#4A5565] hover:text-[#4F39F6] transition-colors">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5.33337C13.1046 5.33337 14 4.43794 14 3.33337C14 2.2288 13.1046 1.33337 12 1.33337C10.8954 1.33337 10 2.2288 10 3.33337C10 4.43794 10.8954 5.33337 12 5.33337Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14.6666C13.1046 14.6666 14 13.7712 14 12.6666C14 11.5621 13.1046 10.6666 12 10.6666C10.8954 10.6666 10 11.5621 10 12.6666C10 13.7712 10.8954 14.6666 12 14.6666Z"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.72656 9.00671L10.2799 11.66"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.2732 4.33997L5.72656 6.9933"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-['Outfit']">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
