import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const messages:any = [];
const users:any = [];
let onlineUsers = new Set();

const app = express();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200"
    }
});

app.get("/", (req, res) => {
    res.send("<h1>Socket.io Server is Running!</h1>");
});

io.on('connection', (socket) => {
    onlineUsers.add(socket.id);
    io.emit("onlineUsers", [...onlineUsers]);
    socket.emit('receive-message', messages);
    socket.emit('receive-users', users);

    socket.on('message-event', (data) => {
        messages.push(data);
        io.emit('receive-message', messages);
    });

    socket.on('add-user', (data) => {
        users.push(data);
        io.emit('receive-users', users);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    
        // Remove user from online list
        onlineUsers.delete(socket.id);
    
        // Notify all clients about the updated list
        io.emit("onlineUsers", [...onlineUsers]);
      });
});

// Use PORT from environment for deployment
const PORT = process.env.PORT || 4567;
server.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});