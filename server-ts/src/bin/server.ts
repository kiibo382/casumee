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

io.on('connection', socket => {
    console.log(`socket_id: ${socket.id} is connected.`)
    socket.on('send-chat-data', (chatData: any) => {
        const group = new Chat({ chatData });
        group.save(function () {
            return;
        });
        socket.emit('new-chat-data', chatData)
        console.log(`receive chat data: ${JSON.stringify(chatData)}`)
    })
})

httpServer.listen(port, () => {
    console.log(`listening on *:${port}`)
})