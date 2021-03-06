import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () =>
  console.log(`๐Listening on http://localhost:3000๐`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done("hello from the backend");
    }, 4000);
  });
});

// const wss = new WebSocket.Server({ server }); // ์น์์ผ์ฉ ์๋ฒ

// const sockets = []; // ๋ชจ๋  ๋ธ๋ผ์ฐ์ ์ ์์ผ์ ์ ๋ฌํ๊ธฐ ์ํด ์์ฑ

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous"
//   console.log("โ Connected to Browser! โ");
//   socket.on("close", () => console.log("โDisconnected from the Browser!โ"));
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((allSocket) => allSocket.send(`${socket.nickname}: ${message.payload}`));
//       case "nickname":
//         socket["nickname"] = message.payload;
//       // sockets.forEach((allSocket) => allSocket.send(parsed.payload));
//     }
//     // ํ๋ก ํธ์์ ๋์ด์จ ์์ผ ๋ฉ์ธ์ง๋ฅผ ๊ตฌ๋ถํ์ฌ ๋ชจ๋  ๋ธ๋ผ์ฐ์ ์ ์ ๋ฌ
//   });
// });

httpServer.listen(3000, handleListen); // ์ด๋ ๊ฒ ํ๋ฉด http, ws์ฉ ์๋ฒ๋ฅผ ํ๋ฒ์ ์คํ ๊ฐ๋ฅ

// app.listen(3000,handleListen);
