const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  updateSubscr,
  currentUser,
} = require("../../controllers/auth");
const {
  schemaRegister,
  schemaLogin,
  schemaSubscr,
} = require("../../models/user");
const { validate } = require("../../middleware/validate");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.post("/signup", validate(schemaRegister), registerUser);
router.post("/login", validate(schemaLogin), loginUser);
router.post("/logout", auth, logOutUser);
router.patch("/:id", auth, validate(schemaSubscr), updateSubscr);
router.get("/current", auth, currentUser);

module.exports = router;
