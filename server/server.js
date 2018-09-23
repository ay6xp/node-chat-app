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
  console.log('New user connected');
  //whenever a new user connects

  socket.on('disconnect',() => {
    console.log('client disconnected');
  });

});



server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
