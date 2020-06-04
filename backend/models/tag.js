const mongoose = require(`mongoose`)

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    slug: {
      type: String,
      index: true,
      unique: true
    }
  },
  { timestamp: true }
);

//export tag model

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
