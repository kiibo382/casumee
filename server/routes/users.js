import {
  insert,
  getSelf,
  getList,
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
import {
  minimumPermissionLevelRequired
} from "../middlewares/users/permission.js";
import { validJWTNeeded } from "../middlewares/users/validation.js";
import envConfig from "../config/env.config.js";
const permissionLevels = envConfig.permissionLevels;

const ADMIN = permissionLevels.ADMIN;
const PAID = permissionLevels.PAID_USER;
const FREE = permissionLevels.NORMAL_USER;

import express from "express";
const router = express.Router();

router.post("/", insert);

router.get("/", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  getList,
]);

router.post("/login", [hasAuthValidFields, isPasswordAndUserMatch, login]);

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
  putByUserName,
]);

router.delete("/self", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  removeByUserName,
]);

router.get("/:userName", [
  validJWTNeeded,
  minimumPermissionLevelRequired(FREE),
  getByUserName,
]);

export default router;
