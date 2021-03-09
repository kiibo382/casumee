import { insert, getList, getById, putById, removeById } from '../controllers/users.js';
import { minimumPermissionLevelRequired, onlySameUserOrAdminCanDoThisAction } from '../middlewares/users/permission.js';
import { validJWTNeeded } from '../middlewares/users/validation.js';
import envConfig from '../config/env.config.js';
const permissionLevels = envConfig.permissionLevels;

const ADMIN = permissionLevels.ADMIN;
const PAID = permissionLevels.PAID_USER;
const FREE = permissionLevels.NORMAL_USER;

import express from 'express';
const router = express.Router();

router.post('/', insert);

router.get('/', [
    validJWTNeeded,
    minimumPermissionLevelRequired(PAID),
    getList
]);

router.get('/:userId', [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    onlySameUserOrAdminCanDoThisAction,
    getById
]);

router.put('/:userId', [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    onlySameUserOrAdminCanDoThisAction,
    putById
]);

router.delete('/:userId', [
    validJWTNeeded,
    minimumPermissionLevelRequired(ADMIN),
    removeById
]);

export default router;