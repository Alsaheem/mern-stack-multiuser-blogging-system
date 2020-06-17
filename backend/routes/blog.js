const express = require(`express`);
const router = express.Router();
const {
  create,
  list,
  read,
  remove,
  update,
  listAllBlogsCategoriesTags,
  photo
} = require("../controllers/blog");
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

router.post("/blog", requireSignin, adminMiddleware, create);
router.get("/blogs", list);
router.get("/blog/:slug", read);
router.put("/blog/:slug", requireSignin, adminMiddleware, update);
router.delete("/blog/:slug", requireSignin, adminMiddleware, remove);
router.post("/blogs-categories-tags", listAllBlogsCategoriesTags);
router.get("/blog/photo/:slug", photo);

module.exports = router;
