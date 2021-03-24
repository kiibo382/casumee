import Users from "../models/users.js";
import envConfig from "../config/env.config.js";
const secret = envConfig.jwt_secret;
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

export function insertUser(req, res) {
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  const user = new Users(req.body);
  user.save(function (err) {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
}

export function getUserList(req, res) {
  const limit = 100;
  Users
    .find()
    .limit(limit)
    .select("userName firstName lastName email profile age gender sns")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function login(req, res) {
  const refreshId = req.body.email + secret;
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(refreshId)
    .digest("base64");
  req.body.refreshKey = salt;
  const token = jsonwebtoken.sign(req.body, secret);
  const b = Buffer.from(hash);
  const refresh_token = b.toString("base64");
  req.session.token = `Bearer ${token}`;
  res.status(200).send({ "refresh_token": refresh_token });
}

export function logout(req, res) {
  if (req.session.token) {
    req.session.token = "";
    res.status(200).send();
  } else {
    return res.status(401).send();
  }
}

export function getSelf(req, res) {
  Users
    .findOne({ "userName": req.jwt.userName })
    .select(
      "userName firstName lastName email profile age gender sns"
    )
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function putSelf(req, res) {
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
}

export function removeSelf(req, res) {
  Users
    .deleteOne({ "userName": req.jwt.userName })
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      req.session.token = "";
      res.status(204).send(result);
    })
}

export function getByUserName(req, res) {
  Users
    .findOne({ "userName": req.params.userName })
    .select(
      "userName firstName lastName email profile age gender sns"
    )
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function putByUserName(req, res) {
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
}

export function removeByUserName(req, res) {
  Users
    .deleteOne({ "userName": req.params.userName })
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      req.session.token = "";
      res.status(204).send(result);
    })
}
