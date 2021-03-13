import {
  createUser,
  list,
  findByUserName,
  putUser,
  removeUser,
} from "../models/users.js";
import envConfig from "../config/env.config.js";
const secret = envConfig.jwt_secret;
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

export function insert(req, res) {
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  createUser(req.body).then((result) => {
    res.status(201).send();
  });
}

export function getList(req, res) {
  const limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  const page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  list(limit, page).then((result) => {
    res.status(200).send(result);
  });
}

export function login(req, res) {
  try {
    const refreshId = req.body.userName + secret;
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
    res.status(200).send();
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

export function logout(req, res, next) {
  if (req.session.token) {
    req.session.token = "";
    res.status(200).send();
  } else {
    return res.status(401).send();
  }
}

export function getSelf(req, res) {
  try {
    findByUserName(req.jwt.userName).then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

export function getByUserName(req, res) {
  try {
    findByUserName(req.params.userName).then((result) => {
      res.status(200).send(result);
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
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

  putUser(req.jwt.userName, req.body).then((result) => {
    res.status(204).send({});
  });
}

export function removeByUserName(req, res) {
  removeUser(req.jwt.userName).then((result) => {
    res.status(204).send({});
  });
}
