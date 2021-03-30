import chatController from "../controllers/chat";
import usersPermission from "../middlewares/users/permission";
import usersValidation from "../middlewares/users/validation";
import { envConfig } from "../config/env.config.js";
const userpermissionLevels = envConfig.permissionLevels;

const ADMIN = userpermissionLevels.ADMIN;
const PAID = userpermissionLevels.PAID_USER;
const FREE = userpermissionLevels.NORMAL_USER;

import Express from "express";
const router: Express.Router = Express.Router();

router.get("/:chatName", [
    usersValidation.validJWTNeeded,
    usersPermission.checkPermissionLevel(FREE),
    chatController.getByChatName,
]);

export default router;