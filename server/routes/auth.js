import { hasAuthValidFields, isPasswordAndUserMatch } from '../middlewares/auth/verify.js';
import { login } from '../controllers/auth.js';
import { validJWTNeeded, verifyRefreshBodyField, validRefreshNeeded } from '../middlewares/users/validation.js';

import express from 'express';
const router = express.Router();

router.post('/', [
    hasAuthValidFields,
    isPasswordAndUserMatch,
    login
]);

router.post('/refresh', [
    validJWTNeeded,
    verifyRefreshBodyField,
    validRefreshNeeded,
    login
]);

export default router