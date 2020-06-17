const mongoose = require(`mongoose`);
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
      min: 3,
      max: 160,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      max: 32,
    },
    body: {
      type: {},
      trim: true,
      lowercase: true,
      min: 200,
      max: 2000000,
      required: true,
    },
    excerpt: {
      type: String,
      max: 1000,
    },
    mtitle: {
      type: String,
    },
    mdesc: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [{ type: ObjectId, ref: "Category", required: true }], //this is an array
    tags: [{ type: ObjectId, ref: "Tag", required: true }], //this is an array of tags
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);



const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
