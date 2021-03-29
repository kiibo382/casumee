import mongoose, { Schema, Document } from "mongoose";

const chatSchema: Schema = new Schema({
    socketId: {
        type: String,
        unique: true,
        required: true,
    },
    userName: {
        type: String
    },
    msg: {
        type: String
    },
});

export interface IChat extends Document {
    _id: Schema.Types.ObjectId
    socketId: String
    msg: String
}

const Chat: mongoose.Model<IChat> = mongoose.model("Chat", chatSchema);
export default Chat