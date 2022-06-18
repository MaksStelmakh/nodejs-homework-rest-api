const express = require("express");
const { auth } = require("../../middleware/auth");
const router = express.Router();
const { upload } = require("../../middleware/upload");
const { uploadImage } = require("../../services/image.service");
const { updateUser } = require("../../services/user.service");

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { _id: id } = req.user;
      const avatarURL = await uploadImage(id, req.file);
      await updateUser(id, { avatarURL });
      res.json({
        status: "success",
        code: 200,
        data: {
          result: avatarURL,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
