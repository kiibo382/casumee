import app from "../app";
import http from "http";
import { Server } from "socket.io";

const port: number = 8080;

const httpServer: http.Server = http.createServer(app);

const io: Server = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    },
});

httpServer.listen(port, () => {
    console.log(`listening on *:${port}`)
})