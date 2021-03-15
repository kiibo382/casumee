import {
    registerGroup,
    getGroupList,
    getByGroupName,
    putByGroupName,
    removeByGroupName,
    getMembersByGroupName,
    addMemberByGroupName,
    removeMemberByGroupName,
    getApplicantsByGroupName,
    addApplicantByGroupName,
    removeApplicantByGroupName
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
    registerGroup,
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
    getMembersByGroupName,
]);

router.post("/:groupName/members", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    addMemberByGroupName,
    removeApplicantByGroupName
]);

router.delete("/:groupName/members", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    removeMemberByGroupName
]);

router.post("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    addApplicantByGroupName
]);

router.get("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    getApplicantsByGroupName
]);

router.delete("/:groupName/applicants", [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    isGroupMember,
    removeApplicantByGroupName
]);

export default router;
