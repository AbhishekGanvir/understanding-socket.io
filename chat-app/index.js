// 1] Import 
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

//2] Create Instances & make Server
const app = express();
const server = http.createServer(app);
const io = new Server(server)

//3] Serve Static Files
app.use(express.static('public'))

//4] Create Connection 
io.on('connection',(socket) => {
    console.log('user Connected Successfully..')

socket.on('chat message',(msg) => {
    io.emit('chat message', msg );
})

    socket.on('disconnect',() =>{
        console.log("User Disconnected... ")
    })
})
//5] Run Server 
server.listen(3000, () => 
    console.log('Server Running on 3000'))