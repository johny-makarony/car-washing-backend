const express = require("express");
const router = express.Router();

const user = require("../../controllers/auth");
const {
  authenticate,
  validateBody,
  // upload,
  // checkFileSize,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), user.register);

router.post("/login", validateBody(schemas.loginSchema), user.login);

router.post("/refresh", validateBody(schemas.refreshSchema), user.refresh);

router.post("/logout", authenticate, user.logout);

router.get("/current", authenticate, user.getCurrent);

router.get("/administrators", authenticate, user.getAdministrators);

// router.patch(
//   "/profile",
//   authenticate,
//   validateBody(schemas.updateSchema),
//   user.updateProfile
// );

// router.patch(
//   "/profile/avatar",
//   authenticate,
//   upload.single("avatar"),
//   checkFileSize,
//   user.updateAvatar
// );

module.exports = router;
