const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY } = process.env;

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Ви не авторизовані"));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.accessToken || user.accessToken !== token) {
      next(HttpError(401, "Ви не авторизовані"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Ви не авторизовані"));
  }
};

module.exports = authenticate;
