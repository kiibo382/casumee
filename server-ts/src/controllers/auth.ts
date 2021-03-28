import { envConfig } from "../config/env.config";
const secret = envConfig.jwt_secret;
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import Express from "express"
import log4js from 'log4js';

let logger = log4js.getLogger();
logger.level = 'debug';

export default {
  returnToken: (req: Express.Request, res: Express.Response) => {
    try {
      const refreshId = req.body.userId + secret;
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");
      req.body.refreshKey = salt;
      const token = jsonwebtoken.sign(req.body, secret);
      const b = Buffer.from(hash);
      const refresh_token = b.toString("base64");
      res.status(201).send({ access_token: token, token_type: "bearer", refresh_oken: refresh_token });
    } catch (err) {
      res.status(500).send({ errors: err });
    }
  }
}
