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

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>'); //_blank opens up new tab
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault(); //so page doesnt refesh
  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function() {

  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not support by your browser.')
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location');
  });

});
