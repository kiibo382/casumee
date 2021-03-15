import {
  createGroup,
  groupList,
  findByGroupName,
  putGroup,
  removeGroup,
  getMembers,
  removeMember,
  getApplicants,
  removeApplicant
} from "../models/groups.js";
import envConfig from "../config/env.config.js";
const secret = envConfig.jwt_secret;
import crypto from "crypto";

export function insertGroup(req, res) {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }
  createGroup(req.body).then((result) => {
    res.status(201).send();
  });
}

export function getGroupList(req, res) {
  const limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  const page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  groupList(limit, page).then((result) => {
    res.status(200).send(result);
  });
}

export function getByGroupName(req, res) {
  try {
    findByGroupName(req.params.groupName).then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send(result);
      }
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

export function putByGroupName(req, res) {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }

  putGroup(req.jwt.groupName, req.body).then((result) => {
    res.status(204).send({});
  });
}

export function removeByGroupName(req, res) {
  removeGroup(req.params.groupName).then((result) => {
    res.status(204).send(result);
  });
}

export function getMembers(req, res) {
  try {
    getMembers(req.params.groupName).then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send(result);
      }
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

export function addMember(req, res) {
  addMember(req.params.groupName, req.params.userName).then((result) => {
    res.status(204).send();
  });
}

export function removeMember(req, res) {
  removeMember(req.params.groupName, req.params.userName).then((result) => {
    res.status(204).send();
  });
}

export function getApplicants(req, res) {
  try {
    getApplicants(req.params.groupName).then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send(result);
      }
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
}

export function addApplicant(req, res) {
  addMember(req.params.groupName, req.params.userName).then((result) => {
    res.status(204).send();
  });
}

export function removeApplicant(req, res) {
  removeApplicant(req.params.groupName, req.params.userName).then((result) => {
    res.status(204).send();
  });
}