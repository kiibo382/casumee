import Chat, { IChat } from "../models/chat";
import Express from "express"
import log4js from 'log4js';

let logger = log4js.getLogger();
logger.level = 'debug';

export default {
    getByChatName: (req: Express.Request, res: Express.Response) => {
        Chat
            .findOne({ "chatName": req.params.chatName })
            .exec(function (err, result: IChat | null) {
                if (err) res.status(500).json(err);
                res.status(200).json(result);
            })
    }
}

