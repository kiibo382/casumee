import Users, { IUser } from "../models/users"
import Groups, { IGroup } from "../models/groups";
import { envConfig } from "../config/env.config";
const secret = envConfig.jwt_secret;
import crypto from "crypto";
import Express from "express"

export default {
  registerGroup: (req: Express.Request, res: Express.Response) => {
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
    });
    Users.findOne({ "userName": req.jwt.userName }, (err: any, user: IUser) => {
      if (err) res.status(500).send(err);
      if (!user) res.status(400).send("user not found");
      Groups.findOneAndUpdate({ "groupName": req.body.groupName }, { $push: { "members": user._id } })
    })
    res.status(201).send();
  },

  getGroupList: (req: Express.Request, res: Express.Response) => {
    const limit = 100;
    Groups.find()
      .limit(limit)
      .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  getByGroupName: (req: Express.Request, res: Express.Response) => {
    Groups
      .findOne({ "groupName": req.params.groupName })
      .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  putByGroupName: (req: Express.Request, res: Express.Response) => {
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
  },

  removeByGroupName: (req: Express.Request, res: Express.Response) => {
    Groups
      .deleteOne({ "groupName": req.params.groupName })
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(204).send(result);
      })
  },

  getMembersByGroupName: (req: Express.Request, res: Express.Response) => {
    Groups
      .findOne({ "groupName": req.params.groupName })
      .populate("members")
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  addMemberByGroupName: (req: Express.Request, res: Express.Response) => {
    Users.findOne({ "userName": req.jwt.staffName }, (err: any, user: IUser) => {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $push: { "members": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
  },

  removeMemberByGroupName: (req: Express.Request, res: Express.Response) => {
    Users.findOne({ "userName": req.jwt.staffName }, (err: any, user: IUser) => {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $pull: { members: user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
  },
  getApplicantsByGroupName: (req: Express.Request, res: Express.Response) => {
    Groups
      .findOne({ "groupName": req.params.groupName })
      .populate("applicant")
      .exec(function (err, result) {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      })
  },

  addApplicantByGroupName: (req: Express.Request, res: Express.Response) => {
    Users.findOne({ "userName": req.jwt.staffName }, (err: any, user: IUser) => {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $push: { "applicants": user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
  },

  removeApplicantByGroupName: (req: Express.Request, res: Express.Response) => {
    Users.findOne({ "userName": req.jwt.staffName }, (err: any, user: IUser) => {
      if (err) res.status(500).send(err);
      Groups
        .updateOne({ "groupName": req.params.groupName }, { $pull: { applicants: user._id } })
        .exec(function (err, result) {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        })
    })
  }
}
