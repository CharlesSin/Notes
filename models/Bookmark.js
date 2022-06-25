import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  title: { type: String, default: "Title string" },
  desc: { type: String, default: "Description string" },
  domain: { type: String, default: "example.com" },
});

export default mongoose.model("bookmark", bookmarkSchema);
