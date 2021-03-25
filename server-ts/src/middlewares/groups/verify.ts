import Groups, { IGroup } from "../../models/groups"
import Users, { IUser } from "../../models/users"
import Express from "express"

export default {
    isGroupMember: function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        Users
            .findOne({ "userName": req.jwt.userName })
            .exec(function (err: any, user) {
                if (err)
                    res.status(500).send(err)
                if (!user)
                    res.status(404).send("member not found")
                Groups
                    .findOne({ "groupName": req.params.groupName })
                    .exec(function (err: any, group: IGroup | null) {
                        if (err)
                            res.status(500).send(err)
                        if (!group)
                            res.status(404).send("group not found")
                        if (group!.members.includes(user!._id)) {
                            next()
                        } else {
                            return res
                                .status(403)
                                .send({ errors: "You are not group member." })
                        }
                    })
            })
    }
}