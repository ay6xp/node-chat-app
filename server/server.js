const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');

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

  //sending new message to clients
  socket.emit('newMessage', {
    from:'Andrew',
    text:'Hey this is so cool',
    createdAt:123
  });

  //listening for a new message from client
  socket.on('createMessage',(message)=> {
    console.log("message", message);
  });

  socket.on('disconnect',() => {
    console.log('client disconnected');
  });

});


server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
