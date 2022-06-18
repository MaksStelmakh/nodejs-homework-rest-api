const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    return res.status(201).json({
      code: 201,
      data: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const infoUser = await authService.loginUser(req.body);
    return res.json({
      code: 200,
      token: infoUser.token,
      user: {
        email: infoUser.user.email,
        subscription: infoUser.user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    await authService.logOutUser(req.user._id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateSubscr = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updating = await authService.updateByIdSubscr(id, req.body);
    if (updating === null) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          result: updating,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const currentUser = (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = {
  register,
  login,
  logOut,
  updateSubscr,
  currentUser,
};
