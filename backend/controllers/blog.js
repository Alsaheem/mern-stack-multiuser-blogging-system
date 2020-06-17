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
      res.send(blogs); //
    });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .populate("postedBy", "_id name username")
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .select(
      "_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt"
    )
    .exec((error, blog) => {
      if (error) {
        return res.status(400).send({ error: error });
      }
      res.send(blog); //
    });
};

exports.listAllBlogsCategoriesTags = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let blogs;
  let categories;
  let tags;

  Blog.find({})
    .populate("postedBy", "_id name username")
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug profile")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((error, data) => {
      if (error) {
        return res.status(400).send({ error: error });
      }

      blogs = data;
      // get all categories
      Category.find({}).exec((err, cats) => {
        if (error) {
          return res.status(400).send({ error: err });
        }
        categories = cats;

        // get all tags

        Tag.find({}).exec((erro, result) => {
          if (error) {
            return res.status(400).send({ error: erro });
          }
          tags = result;
          //the data has to be nested to figure it out
          res.send({ blogs, categories, tags, size: blogs.length });
        });
      });
    });
};

exports.update = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((error, oldBlog) => {
    if (error || oldBlog == null) {
      return res.status(400).send({ error: `blog does not exist` });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).send({ error: `image could not be uploaded` });
      }
      let oldSlug = oldBlog.slug;
      oldBlog = _.merge(oldBlog, fields);
      oldBlog.slug = oldSlug;
      const { body, categories, tags } = fields;

      if (body) {
        oldBlog.excerpt = smartTrim(body, 320, " ", " ...");
        oldBlog.mdesc = stripHtml(body.substring(0, 160));
      }

      if (categories) {
        oldBlog.categories = categories.split(`,`);
      }

      if (tags) {
        oldBlog.tags = categories.split(`,`);
      }

      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res
            .status(400)
            .send({ error: `image should be less that 1mb in size` });
        }

        oldBlog.photo.data = fs.readFileSync(files.photo.path);
        oldBlog.photo.contentType = files.photo.type;
      }

      oldBlog.save((error, result) => {
        if (error) {
          return res.status(400).send({ error: error });
        }
        res.photo = undefined;
        res.send(result);
      });
    });
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOneAndRemove({ slug }).exec((error, tag) => {
    if (error || !tag) {
      return res.status(400).send({ error: "blog does not exist" });
    }
    res.send({ message: "blog deleted successfully" });
    //retun blogs in this tag
  });
};

exports.photo = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug })
    .select(`photo`)
    .exec((error, blog) => {
      if ((error, !blog)) {
        return res.status(400).send({ error: "blog does not exist" });
      }
      res.set(`Content-type`, blog.photo.contentType);
      res.send(blog.photo.data);
    });
};
