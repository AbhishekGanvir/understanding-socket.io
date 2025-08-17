// 1] Packages
import express from "express";

import http from "http";

import { fileURLToPath } from "node:url";

import { dirname, join } from "node:path";

import { Server } from "socket.io";

// 2] Instance

const app = express();

const server = http.createServer(app);

const io = new Server(server);

// 3] Serving HTML File

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// 4] Define a connection event handler
   //Server-side Connection 
io.on("connection", (socket) => {
  console.log("User Connected to (Server) ✔️");

  //Emit a 'message' event to the client
   socket.emit("message"," 📩 Welcome to the server!");
   
   //receiving msg from client side
    socket.on("new message",(message) => {
        console.log(message);
    })


  //Server-side Disconnect 
  socket.on('disconnect', () => {
    console.log('User Disconnected From (Server) ❌')
  })

});

// 5] Start the server
const PORT = 3000;

server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
