const VerifyUserMiddleware = require('../middlewares/auth/verify');
const AuthorizationController = require('../controllers/auth');
const AuthValidationMiddleware = require('../middlewares/users/validation');

const express = require('express');
const { route } = require('.');
const router = express.Router();

router.post('/', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
]);

router.post('/refresh', [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login
]);

module.exports = router