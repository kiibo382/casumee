import Users from "../models/users.js";
import Groups from "../models/groups.js";
import envConfig from "../config/env.config.js";
const secret = envConfig.jwt_secret;
import crypto from "crypto";

export function registerGroup(req, res) {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }
  const group = new Groups(req.body);
  group.save(function (err) {
    if (err) res.status(500).send(err);
    Users.findOne({ "userName": req.jwt.userName })
      .exec(function (err, user) {
        if (err) res.status(500).send(err);
        Groups.updateOne({ "groupName": req.body.groupName }, { $push: { "members": user._id } })
          .exec(function (err, result) {
            if (err) res.status(500).send(err);
            res.status(201).send(result);
          })
      })
    res.status(201).send();
  });
};

export function getGroupList(req, res) {
  const limit = 100;
  Groups.find()
    .limit(limit)
    .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function getByGroupName(req, res) {
  Groups
    .findOne({ "groupName": req.params.groupName })
    .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
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
  Groups
    .findOneAndUpdate({ "groupName": req.params.groupName }, req.body)
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function removeByGroupName(req, res) {
  Groups
    .deleteOne({ "groupName": req.params.groupName })
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(204).send(result);
    })
}

export function getMembersByGroupName(req, res) {
  Groups
    .findOne({ "groupName": req.params.groupName })
    .populate("members")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function addMembersByGroupName(req, res) {
  Users
    .findOne({ "userName": req.body.userName })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $push: { "members": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function removeMembersGroupName(req, res) {
  Users
    .findOne({ "UserName": req.body.userName })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $pop: { "members": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function getApplicantByGroupName(req, res) {
  Groups
    .findOne({ "groupName": req.params.groupName })
    .populate("applicant")
    .exec(function (err, result) {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    })
}

export function addApplicantByGroupName(req, res) {
  Users
    .findOne({ "userName": req.body.userName })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $push: { "applicants": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

export function removeApplicantByGroupName(req, res) {
  Users
    .findOne({ "userName": req.body.userName })
    .exec(function (err, user) {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $pop: { "applicants": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
}

