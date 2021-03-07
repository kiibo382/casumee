const usersController = require('../controllers/users');
const authPermission = require('../middlewares/users/permission');
const authValidation = require('../middlewares/users/validation');
const envConfig = require('../config/env.config');
const permissionLevels = envConfig['permissionLevels'];

const ADMIN = permissionLevels.ADMIN;
const PAID = permissionLevels.PAID_USER;
const FREE = permissionLevels.NORMAL_USER;

const express = require('express');
const router = express.Router();

router.post('/', usersController.insert);

router.get('/', [
    authValidation.validJWTNeeded,
    authPermission.minimumPermissionLevelRequired(PAID),
    usersController.list
]);

router.get('/:userId', [
    authValidation.validJWTNeeded,
    authPermission.minimumPermissionLevelRequired(FREE),
    authPermission.onlySameUserOrAdminCanDoThisAction,
    usersController.getById
]);

router.put('/:userId', [
    authValidation.validJWTNeeded,
    authPermission.minimumPermissionLevelRequired(FREE),
    authPermission.onlySameUserOrAdminCanDoThisAction,
    usersController.putById
]);

router.delete('/:userId', [
    authValidation.validJWTNeeded,
    authPermission.minimumPermissionLevelRequired(ADMIN),
    usersController.removeById
]);

module.exports = router;