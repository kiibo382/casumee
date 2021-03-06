const usersController = require('../controllers/users');
const authPermission = require('../middlewares/auth.permission');
const authValidation = require('../middlewares/auth.permission');
const envConfig = require('../config/env.config');
const permissionLevels = envConfig['permissionLevels'];

const ADMIN = permissionLevels.ADMIN;
const PAID = permissionLevels.PAID_USER;
const FREE = permissionLevels.NORMAL_USER;

const express = require('express');
const router = express.Router();

router.post('/users', [
    usersController.insert
]);

router.get('/users', [
    authValidation.validJWTNeeded,
    authPermission.minimumPermissionLevelRequired(PAID),
    usersController.list
]);

router.get('/users/:userId', [
    authValidation.validJWTNeeded,
    authPermission.minimumPermissionLevelRequired(FREE),
    authPermission.onlySameUserOrAdminCanDoThisAction,
    usersController.getById
]);

router.patch('/users/:userId', [
    authValidation.validJWTNeeded,
    authPermission.minimumPermissionLevelRequired(FREE),
    authPermission.onlySameUserOrAdminCanDoThisAction,
    usersController.patchById
]);

router.delete('/users/:userId', [
    authValidation.validJWTNeeded,
    authPermission.minimumPermissionLevelRequired(ADMIN),
    usersController.removeById
]);

module.exports = router;