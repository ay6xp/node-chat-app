//notes on js, commented out functions

//server.js


  //creating event (rather than listening to it)
  // socket.emit('newEmail',{
  //   //send back object
  //   from:'mike@example.com',
  //   text:'hey whats going on',
  //   createdAt: 123
  // });
  // //listening for create email event
  // socket.on('createEmail', (newEmail)=> {
  //   console.log('createEmail', newEmail);
  // });

  //sending new message to clients
  socket.emit('newMessage', {
    from:'Andrew',
    text:'Hey this is so cool',
    createdAt:123
  });

//index.js
//data emitted from event is provided as first argument in callback
// socket.on('newEmail',function (email) {
// console.log('New email', email);
//
// });

//sending new message to server
socket.emit('createMessage', {
  from:"Ahmed",
  text:"Hey this is fun!"
});
