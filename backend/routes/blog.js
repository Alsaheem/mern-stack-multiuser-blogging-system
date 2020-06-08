const express = require(`express`);
const router = express.Router();
const { create, list ,read,remove,update,listAllBlogsCategoriesTags } = require("../controllers/blog");
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

router.post("/blog", requireSignin, adminMiddleware, create);
router.get("/blogs", list);
router.get("/blogs/:slug", read);
router.put("/blogs/:slug", requireSignin, adminMiddleware, update);
router.delete("/blogs/:slug", requireSignin, adminMiddleware, remove);
router.post("/blogs-categories-tags", listAllBlogsCategoriesTags);

module.exports = router;
