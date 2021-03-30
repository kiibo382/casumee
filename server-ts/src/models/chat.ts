import mongoose, { Schema, Document } from "mongoose";

const chatSchema: Schema = new Schema({
    chatName: {
        type: String,
        required: true,
    },
    userName: String,
    msg: String
});

export interface IChat extends Document {
    _id: Schema.Types.ObjectId
    chatName: String
    userName: String
    msg: String
}

const Chat: mongoose.Model<IChat> = mongoose.model("Chat", chatSchema);
export default Chat