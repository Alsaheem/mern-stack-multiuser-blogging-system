const Tag = require("../models/tag");
const slugify = require(`slugify`);

//create new tag
exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });
  tag.save((error, tag) => {
    if (error) {
      return res.status(400).send({ error: error.errmsg });
    }
    res.status(201).send(tag);
  });
};

exports.list = (req, res) => {
  Tag.find({}).exec((error, tags) => {
    if (error) {
      return res.status(400).send({ error: error });
    }
    res.send(tags);
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug;
  Tag.findOne({ slug: slug }).exec((error, tag) => {
    if (error || !tag) {
      return res.status(400).send({ error: 'tag not found' });
    }
    res.send(tag);
    //rerun blogs in this tag
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug;
  Tag.findOneAndRemove({ slug: slug }).exec((error, tag) => {
    if (error || !tag) {
      return res.status(400).send({ error: "tag does not exist" });
    }
    res.send({ message: "tag deleted successfully" });
    //retun blogs in this tag
  });
};
