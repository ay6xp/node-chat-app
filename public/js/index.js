//used to listen to data from server and sent to server
var socket = io();
socket.on('connect',function () {
  console.log("Connected to server");

  socket.emit('createEmail', {
    to: 'jen@example.com',
    test:'Hey this is andrew'
  });
});

socket.on('disconnect',function() {
  console.log('Disconnected from server');
});
//listening for new messages
socket.on('newMessage', function(newMessage) {
  console.log('newMessage', newMessage);
});
