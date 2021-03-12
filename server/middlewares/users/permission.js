// import jwt from 'jsonwebtoken';
import envConfig from "../../config/env.config.js";
const secret = envConfig.jwt_secret;
const ADMIN_PERMISSION = 4096;

export function minimumPermissionLevelRequired(required_permission_level) {
  return (req, res, next) => {
    const user_permission_level = parseInt(req.jwt.permissionLevel);
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
}

export function onlySameUserOrAdminCanDoThisAction(req, res, next) {
  const user_permission_level = parseInt(req.jwt.permissionLevel);
  const userName = req.jwt.userName;
  if (req.params && req.params.userName && userName === req.params.userName) {
    return next();
  } else {
    if (user_permission_level & ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
}

export function sameUserCantDoThisAction(req, res, next) {
  const userName = req.jwt.userName;

  if (req.params.userName !== userName) {
    return next();
  } else {
    return res.status(400).send();
  }
}
