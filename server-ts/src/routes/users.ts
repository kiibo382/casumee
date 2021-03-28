import usersController from "../controllers/users";
import usersPermission from "../middlewares/users/permission";
import usersValidation from "../middlewares/users/validation";
import { envConfig } from "../config/env.config.js";
const userpermissionLevels = envConfig.permissionLevels;

const ADMIN = userpermissionLevels.ADMIN;
const PAID = userpermissionLevels.PAID_USER;
const FREE = userpermissionLevels.NORMAL_USER;

import Express from "express";
const router: Express.Router = Express.Router();

router.post("/", usersController.insertUser);

router.get("/", [
  usersValidation.validJWTNeeded,
  usersPermission.checkPermissionLevel(FREE),
  usersController.getUserList,
]);

router.get("/self", [
  usersValidation.validJWTNeeded,
  usersPermission.checkPermissionLevel(FREE),
  usersController.getSelf,
]);

router.put("/self", [
  usersValidation.validJWTNeeded,
  usersPermission.checkPermissionLevel(FREE),
  usersController.putByUserName,
]);

router.delete("/self", [
  usersValidation.validJWTNeeded,
  usersPermission.checkPermissionLevel(FREE),
  usersController.removeByUserName,
]);

router.get("/:userName", [
  usersValidation.validJWTNeeded,
  usersPermission.checkPermissionLevel(FREE),
  usersController.getByUserName,
]);

export default router;