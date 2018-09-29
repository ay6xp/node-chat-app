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
  var li = jQuery('<li></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from:'Frank',
//   text:'hi'
// }, function(data) {
//   console.log('Got it', data);
// });  //callbackfunction that is emitted when server acknowledges

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault(); //so page doesnt refesh
  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function() {

  });
});
