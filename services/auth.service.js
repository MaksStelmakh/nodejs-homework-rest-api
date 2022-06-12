const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const createError = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const registerUser = async (userData) => {
  const resultOne = await User.findOne({ email: userData.email });
  if (resultOne) {
    throw createError(409, "Email in use");
  }
  const password = userData.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw createError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
    subscription: user.subscription,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return {
    token,
    user,
  };
};

const logOutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const { id } = payload;
    const user = await User.findById(id);
    return user.token !== token ? null : user;
  } catch (error) {
    return null;
  }
};

const updateByIdSubscr = async (id, subscription) => {
  const newSubscr = await User.findByIdAndUpdate(id, subscription, {
    new: true,
  });
  return newSubscr;
};

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
  logOutUser,
  updateByIdSubscr,
};
