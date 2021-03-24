import {
  insertUser,
  getSelf,
  putSelf,
  removeSelf,
  getUserList,
  login,
  logout,
  getByUserName,
  putByUserName,
  removeByUserName,
} from "../controllers/users.js";
import {
  hasAuthValidFields,
  isPasswordAndUserMatch,
} from "../middlewares/auth/verify.js";
import { minimumPermissionLevelRequired } from "../middlewares/users/permission.js";
import { validJWTNeeded } from "../middlewares/users/validation.js";
import envConfig from "../config/env.config.js";
const userpermissionLevels = envConfig.permissionLevels;

const ADMIN = userpermissionLevels.ADMIN;
const PAID = userpermissionLevels.PAID_USER;
const FREE = userpermissionLevels.NORMAL_USER;

import express from "express";
const router = express.Router();

router.post("/", insertUser);

router.get("/", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  getUserList,
]);

router.post("/login", [
  hasAuthValidFields,
  isPasswordAndUserMatch,
  login
]);

router.post("/logout", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  logout,
]);

router.get("/self", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  getSelf,
]);

router.put("/self", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  putSelf,
]);

router.delete("/self", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  removeSelf,
]);

router.get("/:userName", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  getByUserName,
]);

router.put("/:userName", [
  validJWTNeeded,
  minimumPermissionLevelRequired(ADMIN),
  putByUserName,
]);

router.delete("/:userName", [
  validJWTNeeded,
  minimumPermissionLevelRequired(ADMIN),
  removeByUserName,
]);

export default router;
