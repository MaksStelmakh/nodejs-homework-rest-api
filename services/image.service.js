const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;
const public = path.join(__dirname, "../public");
const AVATARS = "avatars";

const uploadImage = async (id, file) => {
  const avatarURL = path.join(AVATARS, `${id}${file.originalname}`);
  try {
    await sharp(file.path)
      .resize({ width: 250 })
      .toFile(path.join(public, avatarURL));
    return avatarURL;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    fs.unlink(file.path);
  }
};

module.exports = {
  uploadImage,
};
