const express = require("express");
const {
  register,
  login,
  logOut,
  updateSubscr,
  currentUser,
  confirm,
  resend,
} = require("../../controllers/auth");
const {
  schemaRegister,
  schemaLogin,
  schemaSubscr,
  schemaNewValidate,
} = require("../../models/user");
const { validate } = require("../../middleware/validate");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.post("/signup", validate(schemaRegister), register);
router.post("/login", validate(schemaLogin), login);
router.post("/logout", auth, logOut);
router.patch("/:id", auth, validate(schemaSubscr), updateSubscr);
router.get("/current", auth, currentUser);
router.get("/verify/:verificationToken", confirm);
router.post("/verify", validate(schemaNewValidate), resend);

module.exports = router;
