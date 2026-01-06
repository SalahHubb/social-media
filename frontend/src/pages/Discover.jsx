import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Discover() {
  const { users, mainUser, sendConnectionRequest, followUser, unfollowUser } =
    useContext(AuthContext);
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState(null);

  // filter people based on query
  useEffect(() => {
    if (!query) return;

    const filetedPeople = users.filter((user) => {
      const lowerQuery = query.toLowerCase();
      return (
        user.firstName.toLowerCase().includes(lowerQuery) ||
        (user.username && user.username.toLowerCase().includes(lowerQuery)) ||
        (user.bio && user.bio.toLowerCase().includes(lowerQuery)) ||
        (user.location && user.location.toLowerCase().includes(lowerQuery))
      );
    });
    setPeople(filetedPeople);
  }, [query, users]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white py-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-[#0F172B] leading-9 mb-2 font-['Outfit']">
            Discover People
          </h1>
          <p className="text-base text-[#45556C] leading-6 font-['Outfit']">
            Connect with amazing people and grow your network
          </p>
        </div>

        <div className="mb-8 sm:mb-10">
          <div className="relative bg-white/80 backdrop-blur-sm rounded-md border border-[#E2E8F0]/60 shadow-md p-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 17.5L13.8833 13.8833"
                    stroke="#90A1B9"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="#90A1B9"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search people by name, username, bio, or location..."
                className="w-full pl-12 pr-4 py-3 rounded-md border border-[#D1D5DC] text-base font-['Outfit'] placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[#615FFF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-md border border-[#E5E7EB] shadow-sm p-6 flex flex-col items-center"
            >
              <img
                src={person.imageUrl}
                alt={person.firstName}
                className="w-16 h-16 rounded-full shadow-md mb-6"
              />

              <div className="text-center mb-4">
                <h3 className="text-base font-semibold text-black leading-6 font-['Outfit']">
                  {person.firstName} {person.lastName}
                </h3>
                <p className="text-base font-light text-[#6A7282] leading-6 font-['Outfit']">
                  {person.username}
                </p>
              </div>

              <p className="text-sm text-[#4A5565] text-center leading-5 mb-6 font-['Outfit'] whitespace-pre-line">
                {person.bio}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#D1D5DC]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3332 6.66668C13.3332 9.99534 9.6405 13.462 8.4005 14.5327C8.28499 14.6195 8.14437 14.6665 7.99984 14.6665C7.85531 14.6665 7.71469 14.6195 7.59917 14.5327C6.35917 13.462 2.6665 9.99534 2.6665 6.66668C2.6665 5.25219 3.22841 3.89563 4.2286 2.89544C5.2288 1.89525 6.58535 1.33334 7.99984 1.33334C9.41433 1.33334 10.7709 1.89525 11.7711 2.89544C12.7713 3.89563 13.3332 5.25219 13.3332 6.66668Z"
                      stroke="#4A5565"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 8.66666C9.10457 8.66666 10 7.77123 10 6.66666C10 5.56209 9.10457 4.66666 8 4.66666C6.89543 4.66666 6 5.56209 6 6.66666C6 7.77123 6.89543 8.66666 8 8.66666Z"
                      stroke="#4A5565"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs text-[#4A5565] font-['Outfit']">
                    {person.location}
                  </span>
                </div>

                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#D1D5DC]">
                  <span className="text-xs text-[#4A5565] font-['Outfit']">
                    {person.followers.length}
                  </span>
                  <span className="text-xs text-[#4A5565] font-['Outfit']">
                    Followers
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => {
                    mainUser.following.includes(person.clerkId)
                      ? null
                      : followUser(mainUser.clerkId, person.clerkId);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-gradient-to-r from-[#615FFF] to-[#9810FA] text-white text-base font-['Outfit'] hover:opacity-90 transition-opacity"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.6668 14V12.6667C10.6668 11.9594 10.3859 11.2811 9.88578 10.781C9.38568 10.281 8.70741 10 8.00016 10H4.00016C3.29292 10 2.61464 10.281 2.11454 10.781C1.61445 11.2811 1.3335 11.9594 1.3335 12.6667V14"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.00016 7.33333C7.47292 7.33333 8.66683 6.13943 8.66683 4.66667C8.66683 3.19391 7.47292 2 6.00016 2C4.5274 2 3.3335 3.19391 3.3335 4.66667C3.3335 6.13943 4.5274 7.33333 6.00016 7.33333Z"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.6665 5.33334V9.33334"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.6665 7.33334H10.6665"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    {mainUser.following.includes(person.clerkId)
                      ? "Following"
                      : "Follow"}
                  </span>
                </button>

                <button
                  className="w-12 h-10 flex items-center justify-center rounded-md border border-[#62748E] hover:bg-slate-50 transition-colors"
                  aria-label="Connection request"
                  onClick={() => {
                    sendConnectionRequest(mainUser.clerkId, person.clerkId);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.58317 16.6667C8.17365 17.4825 10.0032 17.7035 11.7422 17.2898C13.4812 16.8761 15.0153 15.8548 16.068 14.4101C17.1206 12.9654 17.6227 11.1922 17.4837 9.41012C17.3446 7.628 16.5737 5.95413 15.3097 4.69015C14.0457 3.42617 12.3718 2.6552 10.5897 2.51617C8.80758 2.37714 7.0344 2.87919 5.58969 3.93186C4.14498 4.98453 3.12375 6.51858 2.71002 8.25758C2.2963 9.99658 2.51729 11.8262 3.33317 13.4167L1.6665 18.3333L6.58317 16.6667Z"
                      stroke="#62748E"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
