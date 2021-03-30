import app from "../app";
import http from "http";
import { Server } from "socket.io";
import Chat from "../models/chat";

const port: number = 8080;

const httpServer: http.Server = http.createServer(app);

const io: Server = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    },
});

const dms = io.of("/dms");

dms.on("connection", socket => {
    console.log(`socket_id: ${socket.id} is connected.`)

    socket.on('send-chat-data', (chatData: any) => {
        chatData.users.sort()
        const chatName = `${chatData.users[0]}${chatData.users[1]}`
        const chat = new Chat({ "chatName": chatName, "userName": chatData.userName, "msg": chatData.msg });
        chat.save();
        socket.join(chatName);
        socket.to(chatName).emit('new-chat-data', { "userName": chatData.userName, "msg": chatData.msg })
        console.log(`receive chat data: ${JSON.stringify(chatData)}`)
    })
});

httpServer.listen(port, () => {
    console.log(`listening on *:${port}`)
})