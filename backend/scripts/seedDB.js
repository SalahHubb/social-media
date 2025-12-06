import { connectToDB, DisconnectDB } from "../config/db.js";
import { faker } from "@faker-js/faker";
import User from "../models/userSchema.js";
import Post from "../models/postSchema.js";
import Story from "../models/storySchema.js";

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    connectToDB();

    const clerkId = "b2919971-b4c7-4a0f-be7b-361186dfcf8f";

    // now let's create some dummy stories for this user from the below array based on our storySchema

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

    const dummyStories = stories.map((story) => ({
      clerkId: clerkId,
      mediaUrl: story.image || "",
      text: story.text || "",
      date: faker.date.recent(),
    }));

    await Story.insertMany(dummyStories);
    console.log("Stories seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // 4. Disconnect from MongoDB
    await DisconnectDB();
  }
};

seedDatabase();
// To run the seeding script use: node backend/scripts/seedDB.js

// 2. Generate an array of dummy users
// const usersToCreate = 10; // Number of dummy users
// const dummyUsers = [];

// for (let i = 0; i < usersToCreate; i++) {
//   dummyUsers.push({
//     clerkId: faker.string.uuid(),
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     email: faker.internet.email(),
//     imageUrl: faker.image.avatar(),
//     username: faker.internet.username(),
//     location: faker.location.city(),
//     followers: [],
//     following: [],
//   });
// }

// // 3. Insert dummy users into the collection
// await User.insertMany(dummyUsers);
// console.log(`${usersToCreate} dummy users seeded successfully!`);

/*

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

    // let's push the above posts into the database based on the postSchema and delete the above posts array after inserting into the database

    const dummyPosts = posts.map((post) => ({
      clerkId: faker.string.uuid(),
      text: post.content || "",
      mediaUrl: post.image || "",
      likeCount: post.likes,
      shareCount: post.shares,
      commentCount: post.comments,
      date: faker.date.recent(),
    }));

    await Post.insertMany(dummyPosts);
    console.log("Posts seeded successfully!");


*/

//
