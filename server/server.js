const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/messages.js');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//using middleware to server up public folder
app.use(express.static(publicPath));
//register event listener, listen for new connection
io.on('connection', (socket) => {
  //whenever a new user connects
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

  //listening for a new message from client
  socket.on('createMessage',(message)=> {
    console.log("message", message);
    //io.emit emits an event to every single connection
    io.emit('newMessage',generateMessage(message.from,message.text));
    //will sent everyone message but person who sent it
    // socket.broadcast.emit('newMessage', {
    //   from:message.from,
    //   text:message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',() => {
    console.log('client disconnected');
  });

});


server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
