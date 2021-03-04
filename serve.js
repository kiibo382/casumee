const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);
const port = 3000

const DOCUMENT_ROOT = __dirname + "/public";

app.get("/", (req, res)=>{
  res.sendFile(DOCUMENT_ROOT + "/index.html");
});

io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("post", (msg)=>{
    io.emit("member-post", msg);
  });
});

http.listen(port, ()=>{
  console.log("listening on *:3000");
});