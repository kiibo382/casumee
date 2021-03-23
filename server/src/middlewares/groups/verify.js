import Users from "../../models/users.js"
import Groups from "../../models/groups.js"

export function isGroupMember(req, res, next) {
    Users
        .findOne({ "userName": req.jwt.userName })
        .exec(function (err, user) {
            if (err) res.status(500).send(err);
            Groups
                .findOne({ "groupName": req.params.groupName })
                .exec(function (err, group) {
                    if (err) res.status(500).send(err);
                    if (group.staff.includes(user._id)) {
                        next()
                    } else {
                        return res
                            .status(403)
                            .send({ errors: "You are not group member." });
                    }
                })
        })
}
