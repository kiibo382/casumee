import {
  createUser,
  list,
  findById,
  putUser,
  removeUser,
} from "../models/users.js";
import envConfig from "../config/env.config.js";
const secret = envConfig.jwt_secret;
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

export function insert(req, res) {
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto.createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  createUser(req.body).then((result) => {
    res.status(201).send({ id: result._id });
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

export function getById(req, res) {
  findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
}

export function putById(req, res) {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto.createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }

  putUser(req.params.userId, req.body).then((result) => {
    res.status(204).send({});
  });
}

export function removeById(req, res) {
  console.log(req.params.userId);
  removeUser(req.params.userId).then((result) => {
    res.status(204).send({});
  });
}
