import mongoose, { Schema, Document, ModelOptions } from "mongoose";
import { IUser } from "./users"


const urlsSchema: Schema = new Schema({
    name: String,
    url: {
        type: String,
        required: true
    }
})

const groupsSchema: Schema = new Schema({
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
    urls: [urlsSchema],
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
    members: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    applicants: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});

groupsSchema.index({ groupName: 1 }, { unique: true })

export interface IUrls extends Document {
    name: String
    url: String
};

export interface IGroup extends Document {
    groupName: String
    emailDomain: String
    password: String
    urls: [IUser]
    intern: Boolean
    newCareer: Boolean
    midCareer: Boolean
    industry: String
    profile: String
    members: [Schema.Types.ObjectId]
    applicants: [Schema.Types.ObjectId]
};

export interface IGroupWithMembersAndApplicants extends Document {
    groupName: String
    emailDomain: String
    password: String
    urls: [IUrls]
    intern: Boolean
    newCareer: Boolean
    midCareer: Boolean
    industry: String
    profile: String
    members: [IUser]
    applicants: [IUser]
};

const Groups = mongoose.model<IGroup>("Groups", groupsSchema)
export default Groups