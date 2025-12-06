import { Eye } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const { users = [], setSelectedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // const contacts = [
  //   {
  //     id: 1,
  //     name: "John Warren",
  //     username: "@john_warren",
  //     avatar:
  //       "https://api.builder.io/api/v1/image/assets/TEMP/19143ddd9f30eb76ab67c4e523545be83c7021c0?width=96",
  //     bio: "🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a time. ✨ Staying curious. Creating with purpose.",
  //   },
  //   {
  //     id: 2,
  //     name: "Richard Hendricks",
  //     username: "@Richard Hendricks",
  //     avatar:
  //       "https://api.builder.io/api/v1/image/assets/TEMP/ecc9705e3ff5f8da53cd9c04e7cfaa07a6fb6029?width=96",
  //     bio: "🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a time. ✨ Staying curious. Creating with purpose.",
  //   },
  //   {
  //     id: 3,
  //     name: "Alexa james",
  //     username: "@alexa_james",
  //     imageUrl:
  //       "https://api.builder.io/api/v1/image/assets/TEMP/7e9367888be9614f9efc4eeb7f9c7a94494a4c2c?width=96",
  //     bio: "🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a time. ✨ Staying curious. Creating with purpose.",
  //   },

  //   ...users,
  // ];

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-[#0F172B] leading-9 mb-2">
            Messages
          </h1>
          <p className="text-base text-[#45556C] leading-6">
            Talk to your friends and family
          </p>
        </div>

        <div className="space-y-4">
          {users.length > 0 &&
            users.map((u) => (
              <div
                key={u._id}
                className="bg-white rounded-md shadow-sm p-6 relative"
              >
                <div className="flex items-start gap-2 lg:gap-5">
                  <img
                    src={u.imageUrl}
                    alt={u.name}
                    className="w-12 h-12 rounded-full shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <h3 className="text-base font-medium text-[#314158] leading-6">
                        {u.firstName}
                      </h3>
                      <p className="text-base text-[#62748E] leading-6">
                        {u.username || ""}
                      </p>
                    </div>
                    <p className="text-sm text-[#4A5565] leading-5 mt-1">
                      {u.bio}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 shrink-0">
                    <div
                      onClick={() =>
                        setSelectedUser(() =>
                          users.find((user) => user.clerkId == u.clerkId)
                        )
                      }
                    >
                      <Link
                        className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors lg:w-10 lg:h-10"
                        to={`/chat`}
                      >
                        <MessageSquare />
                      </Link>
                    </div>

                    <Link
                      className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors lg:w-10 lg:h-10"
                      to={`/profile/${u.clerkId}`}
                    >
                      <Eye />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
