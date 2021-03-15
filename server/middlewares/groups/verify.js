import { getMembers } from "../../models/groups.js"

export function isGroupMember(req, res, next) {
    getMembers(req.params.groupName).then((members) => {
        if (req.jwt.userName in members) {
            next()
        } else {
            return res
                .status(403)
                .send({ errors: "You are not group member." });
        }
    })
}