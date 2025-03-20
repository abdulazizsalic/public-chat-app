import { Server } from 'socket.io';

const messages:any = [];
const users:any = [];
let onlineUsers = new Set();

const io = new Server(3000, {
    cors: {
        origin: 'http://localhost:4200'
    }
});
//
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