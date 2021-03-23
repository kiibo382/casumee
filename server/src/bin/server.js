import app from "../app.js";
import http from "http";
import { Server } from "socket.io";

const port = 8080;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    },
});

httpServer.listen(port, () => {
    console.log(`listening on *:${port}`)
})

