const Category = require("../models/category");
const slugify = require(`slugify`);

//create new category
exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let category = new Category({ name, slug });
  category.save((error, category) => {
    if (error) {
      return res.status(400).send({ error: error.errmsg });
    }
    res.status(201).send(category);
  });
};

exports.list = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).send({ error: error });
    }
    res.send(categories);
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug;
  console.log(slug);
  Category.findOne({ slug: slug }).exec((error, category) => {
    if (error || !category) {
      return res.status(400).send({ error: 'category not found' });
    }
    res.send(category);
    //retun blogs in this category
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug;
  Category.findOneAndRemove({ slug: slug }).exec((error, category) => {
    if (error || !category) {
      return res.status(400).send({ error: "category does not exist" });
    }
    res.send({ message: "category deleted successfully" });
    //rerun blogs in this category
  });
};
