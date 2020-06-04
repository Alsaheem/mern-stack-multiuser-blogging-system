const mongoose = require(`mongoose`)

const categorySchema = new mongoose.Schema(
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

//export category model

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
