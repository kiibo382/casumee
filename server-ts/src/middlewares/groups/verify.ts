import Groups, { IGroup } from "../../models/groups"
import Users, { IUser } from "../../models/users"
import Express from "express"

export default {
    isGroupMember: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        Users
            .findOne({ "userName": req.jwt.userName }), (err: any, user: IUser) => {
                if (err) res.status(500).send(err);
                Groups
                    .findOne({ "groupName": req.params.groupName }), (err: any, group: IGroup) => {
                        if (err) res.status(500).send(err);
                        if (group.members.includes(user._id)) {
                            next()
                        } else {
                            return res
                                .status(403)
                                .send({ errors: "You are not group member." });
                        }
                    }
            }
    }
}