import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
