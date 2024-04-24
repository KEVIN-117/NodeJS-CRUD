import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGODB_URI);

export const config = {
  url: process.env.MONGODB_URI || "mongodb://localhost:27017/posts",
};
