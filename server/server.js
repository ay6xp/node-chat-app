const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/messages.js');
const {isRealString} = require('./utils/validation');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
//using middleware to server up public folder
app.use(express.static(publicPath));
//register event listener, listen for new connection
io.on('connection', (socket) => {
  //whenever a new user connects
  console.log('New user connected');

  socket.on('join', (params, callback) => {

    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    // socket.leave('The Office Fans');
    // io.emit -> io.to('The Office Fans').emit emits to all users connected to office fans room
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit //emits to all in room except sender
    // socket.emit  //sends to specific user
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));

    callback();


  });

  //listening for a new message from client
  socket.on('createMessage',(message, callback)=> {
    console.log("message", message);
    //io.emit emits an event to every single connection
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
    //will sent everyone message but person who sent it
    // socket.broadcast.emit('newMessage', {
    //   from:message.from,
    //   text:message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude))
  });

  socket.on('disconnect',() => {
    console.log('client disconnected');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

});


server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
