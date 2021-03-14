import mongoose from "../config/mongoose.js";
import { userSchema } from "./users";

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    name: String,
    url: {
        type: String,
        required: true
    }
})

const groupSchema = new Schema({
    groupName: {
        type: String,
        unique: true,
        required: true,
    },
    emailDomain: {
        type: String,
        unique: true
    },
    password: String,
    urls: [urlSchema],
    intern: {
        type: Boolean,
        default: false
    },
    newCareer: {
        type: Boolean,
        default: false
    },
    midCareer: {
        type: Boolean,
        default: false
    },
    industry: String,
    profile: String,
    members: [String],
    applicants: [String]
});

const Group = mongoose.model("Group", groupSchema);

export function findByGroupName(groupName) {
    return new Promise((resolve, reject) => {
        Group.findOne({ "gruopName": groupName })
            .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
            .exec(function (err, group) {
                if (err) {
                    reject(err);
                } else {
                    resolve(group);
                }
            });
    })
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            return result
        })
        .catch(() => {
            return null
        })
}

export function createGroup(groupData) {
    const group = new Group(groupData);
    return group.save();
}

export function groupList(perPage, page) {
    return new Promise((resolve, reject) => {
        Group.find()
            .limit(perPage)
            .skip(perPage * page)
            .select("groupName emailDomain urls intern newCareer midCareer industry profile members")
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            });
    })
}

export function putGroup(groupName, groupData) {
    return Group.findOneAndUpdate({ "groupName": groupName }, groupData);
}

export async function removeGroup(groupName) {
    try {
        return Group.deleteMany({ "groupName": groupName });
    } catch (e) {
        return e;
    }
}

export function GetMembers(groupName, userName) {
    return Group.where({ "groupName": groupName }).update({ $push: { "members": userName } });
}

export function addMember(groupName, userName) {
    return Group.where({ "groupName": groupName }).update({ $push: { "members": userName } });
}

export function addApplicant(groupName, userName) {
    return Group.where({ "groupName": groupName }).update({ $push: { "applicants": userName } });
}