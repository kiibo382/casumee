import Users, { UserData } from "../models/users";
import Express from "express"
import { envConfig } from "../config/env.config";
const secret = envConfig.jwt_secret;
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

export default {
  insertUser: (req: Express.Request, res: Express.Response) => {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    const user = new Users(req.body)
    user.save(function (err) {
      if (err) res.status(500).send(err);
      res.status(201).send("Signup Successed")
    })
  },

  getUserList: (req: Express.Request, res: Express.Response) => {
    const limit: number = 100;
    Users
      .find()
      .limit(limit)
      .select("userName firstName lastName email profile age gender sns")
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  login: (req: Express.Request, res: Express.Response) => {
    const refreshId = req.body.email + secret;
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    req.body.refreshKey = salt;
    const token: string = jsonwebtoken.sign(req.body, secret);
    const b = Buffer.from(hash);
    const refresh_token: string = b.toString("base64");
    req.session.token = `Bearer ${token}`;
    res.status(200).send();
  },

  logout: (req: Express.Request, res: Express.Response) => {
    if (req.session.token) {
      req.session.token = "";
      res.status(200).send();
    } else {
      return res.status(401).send();
    }
  },

  getSelf: (req: Express.Request, res: Express.Response) => {
    Users
      .findOne({ "userName": req.jwt.userName })
      .select(
        "userName firstName lastName email profile age gender sns"
      )
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  putSelf: (req: Express.Request, res: Express.Response) => {
    if (req.body.password) {
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      req.body.password = salt + "$" + hash;
    }
    Users
      .findOneAndUpdate({ "userName": req.jwt.userName }, req.body)
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  removeSelf: (req: Express.Request, res: Express.Response) => {
    Users
      .deleteOne({ "userName": req.jwt.userName })
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        req.session.token = "";
        res.status(204).send(result);
      })
  },

  getByUserName: (req: Express.Request, res: Express.Response) => {
    Users
      .findOne({ "userName": req.params.userName })
      .select(
        "userName firstName lastName email profile age gender sns"
      )
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  putByUserName: (req: Express.Request, res: Express.Response) => {
    if (req.body.password) {
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      req.body.password = salt + "$" + hash;
    }
    Users
      .findOneAndUpdate({ "userName": req.params.userName }, req.body)
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  removeByUserName: (req: Express.Request, res: Express.Response) => {
    Users
      .deleteOne({ "userName": req.params.userName })
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        req.session.token = "";
        res.status(204).send(result);
      })
  }
}

