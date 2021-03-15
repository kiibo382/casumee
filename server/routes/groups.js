import {
    insertGroup,
    getGroupList,
    getByGroupName,
    putByGroupName,
    removeByGroupName,
    getMembers,
    addMember,
    removeMember,
    getApplicants,
    addApplicant,
    removeApplicant
} from "../controllers/groups.js";
import { isGroupMember } from "../middlewares/groups/verify.js"
import { minimumPermissionLevelRequired } from "../middlewares/users/permission.js";
import { validJWTNeeded } from "../middlewares/users/validation.js";
import envConfig from "../config/env.config.js";
const permissionLevels = envConfig.permissionLevels;

const ADMIN = permissionLevels.ADMIN;
const PAID = permissionLevels.PAID_USER;
const FREE = permissionLevels.NORMAL_USER;

import express from "express";
const router = express.Router();

router.post("/", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    insertGroup,
]);

router.get("/", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    getGroupList,
]);

router.get("/:groupName", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    getByGroupName,
]);

router.put("/:groupName", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    putByGroupName,
]);

router.delete("/:groupName", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    removeByGroupName,
]);

router.get("/:groupName/members", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    getMembers,
]);

router.post("/:groupName/members", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    addMember,
    removeApplicant
]);

router.delete("/:groupName/members", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    removeMember
]);

router.post("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    addApplicant
]);

router.get("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    getApplicants
]);

router.delete("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    removeApplicant
]);

export default router;
