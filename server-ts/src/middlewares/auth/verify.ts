import Users, { IUser } from "../../models/users";
import crypto from "crypto";
import Express from "express"
import log4js from 'log4js';

let logger = log4js.getLogger();
logger.level = 'debug';

export default {
  hasAuthValidFields: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ errors: "Missing email and password fields" });
    } else {
      return next()
    }
  },
  isPasswordAndUserMatch: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    Users
      .findOne({ "email": req.body.email })
      .exec(function (err: any, user: IUser | null) {
        if (err)
          res.status(500).send(err);
        if (!user) {
          res.status(404).send({ errors: "Invalid e-mail or password" });
        } else {
          const passwordFields = user.password.split("$");
          const salt = passwordFields[0];
          const hash = crypto
            .createHmac("sha512", salt)
            .update(req.body.password)
            .digest("base64");
          if (hash === passwordFields[1]) {
            req.body = {
              userId: user._id,
              userName: user.userName,
              email: user.email,
              permissionLevel: user.permissionLevel,
              provider: "email",
              firstName: user.firstName,
              lastName: user.lastName,
            };
            return next();
          } else {
            return res.status(400).send({ errors: "Invalid e-mail or password" });
          }
        }
      })
  }
}