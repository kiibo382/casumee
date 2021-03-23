import mongoose from "../config/mongoose.js";
import { findByUserName } from "./users.js"

const Schema = mongoose.Schema;

const urlsSchema = new Schema({
    name: String,
    url: {
        type: String,
        required: true
    }
})

const groupsSchema = new Schema({
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

const Groups = mongoose.model("Groups", groupsSchema);

export default Groups