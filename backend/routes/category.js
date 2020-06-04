const express = require(`express`);
const router = express.Router();
const { requireSignin, adminMiddleware } = require("../controllers/auth");

const { create ,list,read,remove} = require("../controllers/category");

// validators
const { categoryCreateValidator } = require("../validators/category"); // this would get the index.html file in validators folder

router.post(
  "/category",
  categoryCreateValidator,
  requireSignin,
  adminMiddleware,
  create
);

router.get("/categories" , list);
router.get("/category/:slug", read);
router.delete("/category/:slug",requireSignin, adminMiddleware, remove);

module.exports = router;
