//used to listen to data from server and sent to server
var socket = io();
 function scrollToBottom() {
   //Selectors
   var messages = jQuery('#messages');
   var newMessage = messages.children('li:last-child');
   //Heights
   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();

   if (clientHeight + scrollTop + newMessageHeight  + lastMessageHeight>= scrollHeight) {
     messages.scrollTop(scrollHeight);
   }
 };

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
  var formattedTime = moment(newMessage.createdAt).format('h:mm a');
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formattedTime

  });

  jQuery('#messages').append(html);
  scrollToBottom();

  // var formattedTime = moment(newMessage.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
  // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from:'Frank',
//   text:'hi'
// }, function(data) {
//   console.log('Got it', data);
// });  //callbackfunction that is emitted when server acknowledges

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li></li>'); //_blank opens up new tab
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault(); //so page doesnt refesh
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from:'User',
    text:messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not support by your browser.')
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location');
      locationButton.removeAttr('disabled').text('Send Location');
  });

});
