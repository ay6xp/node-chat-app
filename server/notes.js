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

//index.js
//data emitted from event is provided as first argument in callback
// socket.on('newEmail',function (email) {
// console.log('New email', email);
//
// });
