const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controller/UsersController");
const UserAvatarController = require("../controller/UserAvatarController");
const ensureAutenticated = require("../middlewar/ensureAutenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", userController.create);
usersRoutes.put("/", ensureAutenticated, userController.update);
usersRoutes.patch(
  "/avatar",
  ensureAutenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
