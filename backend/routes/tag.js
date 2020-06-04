const express = require(`express`);
const router = express.Router();
const { requireSignin, adminMiddleware } = require("../controllers/auth");

const { create ,list,read,remove} = require("../controllers/tag");

// validators
const { tagCreateValidator } = require("../validators/tag"); // this would get the index.html file in validators folder

router.post(
  "/tag",
  tagCreateValidator,
  requireSignin,
  adminMiddleware,
  create
);

router.get("/tags" , list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug",requireSignin, adminMiddleware, remove);

module.exports = router;
