const express = require(`express`);
const router = express.Router();
const { requireSignin, authMiddleware,adminMiddleware } = require("../controllers/auth");
const { profile } = require("../controllers/user");

router.get("/profile", requireSignin, authMiddleware, profile);

module.exports = router;
