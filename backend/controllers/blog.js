const Blog = require("../models/blog");
const Category = require("../models/category");
const Tag = require("../models/tag");
const slugify = require(`slugify`);
const formidable = require(`formidable`);
const _ = require(`lodash`);
const stripHtml = require(`string-strip-html`);
const fs = require(`fs`);
const { smartTrim } = require("../helpers/blog");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send({ error: `image could not be uploaded` });
    }
    const { title, body, categories, tags } = fields;
    if (!title) {
      return res.status(400).send({ error: `title is required` });
    }
    if (title.length <= 10) {
      return res.status(400).send({ error: `title is too short` });
    }

    if (!categories || categories.length === 0) {
      return res
        .status(400)
        .send({ error: `at least one category is required` });
    }
    if (!tags || tags.length === 0) {
      return res.status(400).send({ error: `at least one tag is required` });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    console.log(body);
    blog.excerpt = smartTrim(body, 320, " ", " ...");
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160));
    blog.postedBy = req.user._id;

    // let arayofcategories
    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .send({ error: `image should be less that 1mb in size` });
      }

      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    blog.save((error, result) => {
      if (error) {
        return res.status(400).send({ error: error.message });
      }
      //res.send(result);
      Blog.findByIdAndUpdate(
        //thisreturns the newly updated blog with categories and tags
        result.id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      ).exec((error, result) => {
        if (error) {
          return res.status(400).send({ error: error.message });
        } else {
          Blog.findByIdAndUpdate(
            //this returns the newly updated blog with categories and tags
            result.id,
            { $push: { tags: arrayOfTags } },
            { new: true }
          ).exec((error, result) => {
            if (error) {
              return res.status(400).send({ error: error.message });
            } else {
              res.send(result);
            }
          });
        }
      });
    });
  });
};

// create, list ,read,remove,update,listAllBlogsCategoriesTags

exports.list = (req, res) => {
  Blog.find({})
    .populate("postedBy", "_id name username")
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((error, blogs) => {
      if (error) {
        return res.status(400).send({ error: error });
      }
      res.send(blogs);
    });
};

exports.read = (req, res) => {};

exports.listAllBlogsCategoriesTags = (req, res) => {};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};
