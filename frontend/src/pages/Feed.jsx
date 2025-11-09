import React from "react";
import { assets } from "../assets/assets";

const Feed = () => {
  const posts = [
    {
      id: 1,
      author: "John Warren",
      username: "@john_warren",
      timeAgo: "9 days ago",
      verified: true,
      content:
        "We're a small #team with a big vision — working day and night to turn dreams into products, and #products into something people love.",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/dcb0ab7d24503e59eab05f7fdda1e3e6424ff5ca?width=1280",
      likes: 0,
      comments: 12,
      shares: 7,
    },
    {
      id: 2,
      author: "John Warren",
      username: "@john_warren",
      timeAgo: "16 days ago",
      verified: true,
      content:
        "Unlock your potential—every small step counts. Stay consistent, stay focused, and trust the process. Growth takes time, but every day is a new chance to be better than yesterday. 🌱✨",
      hashtags:
        "#Motivation #GrowthMindset #DailyInspiration #StayFocused #LevelUp #PositiveVibes #KeepGoing #SelfImprovement #MindsetMatters #SuccessJourney",
      likes: 0,
      comments: 12,
      shares: 7,
    },
    {
      id: 3,
      author: "John Warren",
      username: "@john_warren",
      timeAgo: "16 days ago",
      verified: true,
      content:
        "This is a sample paragraph with some #hashtags like #socialmedia and #marketing. Let's find them!",
      likes: 0,
      comments: 12,
      shares: 7,
    },
    {
      id: 4,
      author: "John Warren",
      username: "@john_warren",
      timeAgo: "16 days ago",
      verified: true,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/9e143b7832c9795ce71972704a2a1dbf5518e644?width=1280",
      likes: 1,
      comments: 12,
      shares: 7,
    },
    {
      id: 5,
      author: "John Warren",
      username: "@john_warren",
      timeAgo: "16 days ago",
      verified: true,
      content: "Finally , got the car !",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/a0d467208bad46350ea13d1a96d5b2164c2bacfa?width=1280",
      likes: 0,
      comments: 12,
      shares: 7,
    },
    {
      id: 6,
      author: "John Warren",
      username: "@john_warren",
      timeAgo: "16 days ago",
      verified: true,
      content: "Hello, Everyone this is my first Post",
      likes: 0,
      comments: 12,
      shares: 7,
    },
  ];

  const stories = [
    {
      id: 1,
      type: "create",
      label: "Create Story",
    },
    {
      id: 2,
      text: "📌 This isn't the…",
      gradient: true,
      timeAgo: "3 hours ago",
    },
    {
      id: 3,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/b42f2ebe3aaf94389fc64a144d0eea2fc340316e?width=240",
      timeAgo: "3 hours ago",
    },
    {
      id: 4,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/0516e29cc3567ff8a224d730dddfc9c75494df97?width=240",
      timeAgo: "3 hours ago",
    },
    {
      id: 5,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/3da5df1e5bf3c44c96638910596cd5178632327f?width=240",
      timeAgo: "3 hours ago",
    },
    {
      id: 6,
      text: "🤫 Not every m…",
      gradient: true,
      timeAgo: "3 hours ago",
    },
    {
      id: 7,
      text: "✨ Something …",
      gradient: true,
      timeAgo: "3 hours ago",
    },
  ];

  const messages = [
    {
      id: 1,
      name: "Richard Hendricks",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/5bdbed167d20abe2ed4d892bfaa7612f87b013c2?width=64",
      message: "I seen your profile",
      timeAgo: "3 hours ago",
      unread: 0,
    },
    {
      id: 2,
      name: "John Warren",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/e4c261360f7cac9fea45d2bc5413a47ad370439e?width=64",
      message: "This is a Samsung Tablet",
      timeAgo: "8 days ago",
      unread: 0,
    },
    {
      id: 3,
      name: "Alexa james",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/0d24ec9fbec96a57bed1363222a436d541b0a0db?width=64",
      message: "how are you",
      timeAgo: "15 days ago",
      unread: 1,
    },
  ];

  //   const parts = text.split(/(#\w+)/g);
  //   return parts.map((part, i) =>
  //     part.startsWith("#") ? (
  //       <span key={i} className="text-brand-purple">
  //         {part}
  //       </span>
  //     ) : (
  //       <span key={i}>{part}</span>
  //     )
  //   );
  // };

  //

  // render hashtags
  const renderHashtags = (text) => {
    const parts = text.split(/(#\w+)/g);

    return parts.map((part, i) => {
      if (part.startsWith("#")) {
        return (
          <span key={i} className="text-brand-purple">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1536px] mx-auto px-4 py-5 lg:py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          <div className="space-y-5">
            <div className="overflow-x-auto pb-5 -mx-4 px-4">
              <div className="flex gap-4 min-w-max">
                {stories.map((story) => (
                  <div key={story.id} className="flex-shrink-0">
                    {story.type === "create" ? (
                      <button className="w-[120px] h-[160px] rounded-lg border-2 border-dashed border-[#A3B3FF] bg-gradient-to-b from-[#EEF2FF] to-white shadow-sm flex flex-col items-center justify-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-[#615FFF] flex items-center justify-center">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.16699 10H15.8337"
                              stroke="white"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 4.16797V15.8346"
                              stroke="white"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-[#314158]">
                          Create Story
                        </span>
                      </button>
                    ) : (
                      <div className="w-[120px] h-40 rounded-lg bg-gradient-to-b from-[#615FFF] to-[#9810FA] shadow-sm relative overflow-hidden">
                        {story.image && (
                          <img
                            src={story.image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-70"
                          />
                        )}
                        <img
                          src="https://api.builder.io/api/v1/image/assets/TEMP/0bbcee38288566de515b24908ec63b39e92a63f0?width=64"
                          alt=""
                          className="absolute top-3 left-3 w-8 h-8 rounded-full border border-gray-100 shadow-sm"
                        />
                        {story.text && (
                          <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2">
                            <p className="text-sm text-white/60 line-clamp-2">
                              {story.text}
                            </p>
                          </div>
                        )}
                        <div className="absolute bottom-3 left-12 text-xs text-white">
                          {story.timeAgo}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/5286ba02a18fe2d46c4490703e344f01be20b831?width=80"
                        alt={post.author}
                        className="w-10 h-10 rounded-full shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <h3 className="font-semibold text-base text-black">
                            {post.author}
                          </h3>
                          {post.verified && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.5668 5.74608C2.46949 5.30776 2.48443 4.85198 2.61023 4.42097C2.73604 3.98997 2.96863 3.59771 3.28644 3.28056C3.60425 2.96341 3.997 2.73164 4.42827 2.60674C4.85953 2.48184 5.31535 2.46786 5.75346 2.56608C5.9946 2.18895 6.3268 1.87859 6.71943 1.6636C7.11206 1.44862 7.55249 1.33594 8.00013 1.33594C8.44776 1.33594 8.8882 1.44862 9.28083 1.6636C9.67346 1.87859 10.0057 2.18895 10.2468 2.56608C10.6856 2.46743 11.1422 2.48135 11.5741 2.60656C12.0061 2.73176 12.3994 2.96417 12.7174 3.28218C13.0354 3.60019 13.2678 3.99346 13.393 4.42542C13.5182 4.85737 13.5321 5.31397 13.4335 5.75275C13.8106 5.99389 14.121 6.32608 14.3359 6.71871C14.5509 7.11135 14.6636 7.55178 14.6636 7.99941C14.6636 8.44705 14.5509 8.88748 14.3359 9.28011C14.121 9.67275 13.8106 10.0049 13.4335 10.2461C13.5317 10.6842 13.5177 11.14 13.3928 11.5713C13.2679 12.0025 13.0361 12.3953 12.719 12.7131C12.4018 13.0309 12.0096 13.2635 11.5786 13.3893C11.1476 13.5151 10.6918 13.5301 10.2535 13.4327C10.0126 13.8113 9.68018 14.123 9.28688 14.339C8.89358 14.5549 8.45215 14.6681 8.00346 14.6681C7.55478 14.6681 7.11335 14.5549 6.72004 14.339C6.32674 14.123 5.99429 13.8113 5.75346 13.4327C5.31535 13.531 4.85953 13.517 4.42827 13.3921C3.997 13.2672 3.60425 13.0354 3.28644 12.7183C2.96863 12.4011 2.73604 12.0089 2.61023 11.5779C2.48443 11.1469 2.46949 10.6911 2.5668 10.2527C2.18677 10.0122 1.87374 9.67953 1.65683 9.28556C1.43992 8.89158 1.32617 8.44915 1.32617 7.99941C1.32617 7.54968 1.43992 7.10724 1.65683 6.71327C1.87374 6.3193 2.18677 5.98659 2.5668 5.74608Z"
                                stroke="#2B7FFF"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 8.0013L7.33333 9.33464L10 6.66797"
                                stroke="#2B7FFF"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-[#6A7282]">
                          {post.username} • {post.timeAgo}
                        </p>
                      </div>
                    </div>

                    {post.content && (
                      <p className="text-sm leading-5 mb-4 text-[#1E2939]">
                        {renderHashtags(post.content)}
                      </p>
                    )}

                    {post.hashtags && (
                      <p className="text-sm leading-5 mb-4">
                        {renderHashtags(post.hashtags)}
                      </p>
                    )}

                    {post.image && (
                      <img
                        src={post.image}
                        alt=""
                        className="w-full rounded-lg mb-4"
                      />
                    )}

                    <div className="pt-4 border-t border-gray-200 flex items-center gap-6 text-sm text-[#4A5565]">
                      <button className="flex items-center gap-1.5 hover:text-brand-purple transition-colors">
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
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-brand-purple transition-colors">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.26634 13.3347C6.53873 13.9874 8.0024 14.1642 9.3936 13.8332C10.7848 13.5022 12.012 12.6852 12.8542 11.5295C13.6963 10.3737 14.098 8.95514 13.9867 7.52944C13.8755 6.10374 13.2587 4.76465 12.2475 3.75346C11.2364 2.74228 9.89727 2.1255 8.47157 2.01428C7.04587 1.90305 5.62732 2.3047 4.47155 3.14683C3.31579 3.98896 2.4988 5.21621 2.16782 6.60741C1.83684 7.99861 2.01364 9.46228 2.66634 10.7347L1.33301 14.668L5.26634 13.3347Z"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-brand-purple transition-colors">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5.33203C13.1046 5.33203 14 4.4366 14 3.33203C14 2.22746 13.1046 1.33203 12 1.33203C10.8954 1.33203 10 2.22746 10 3.33203C10 4.4366 10.8954 5.33203 12 5.33203Z"
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
                            d="M12 14.668C13.1046 14.668 14 13.7725 14 12.668C14 11.5634 13.1046 10.668 12 10.668C10.8954 10.668 10 11.5634 10 12.668C10 13.7725 10.8954 14.668 12 14.668Z"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.72656 9.00781L10.2799 11.6611"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.2733 4.34003L5.72665 6.99336"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-md shadow-sm p-4">
              <h3 className="text-xs font-semibold text-[#1D293D] mb-4">
                Sponsored
              </h3>
              <img
                src={assets.sponsored_img}
                alt="Sponsored"
                className="w-full h-[200px] object-cover rounded-md mb-2"
              />
              <p className="text-xs text-[#45556C] mb-1">Email marketing</p>
              <p className="text-xs text-[#90A1B9] leading-4">
                Supercharge your marketing with a powerful, easy-to-use platform
                built for results.
              </p>
            </div>

            <div className="bg-white rounded-md shadow-sm p-4">
              <h3 className="text-xs font-semibold text-[#1D293D] mb-4">
                Recent Messages
              </h3>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-2.5 py-1 hover:bg-gray-50 -mx-2 px-2 rounded cursor-pointer transition-colors"
                  >
                    <img
                      src={message.avatar}
                      alt={message.name}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-xs font-medium text-[#1D293D] truncate">
                          {message.name}
                        </p>
                        <span className="text-[10px] text-[#90A1B9] flex-shrink-0">
                          {message.timeAgo}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-[#6A7282] truncate">
                          {message.message}
                        </p>
                        {message.unread > 0 && (
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#615FFF] text-white text-[10px] flex items-center justify-center">
                            {message.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
