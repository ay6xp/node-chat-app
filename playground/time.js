var moment = require('moment');


// var date = new Date();
//
// console.log(date.getMonth());
// var date = moment();
// date.add(10,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));

var time = moment();
console.log(time.format('H:mm A'));
//timestamp
var currentTime = moment().valueOf();//current time in unix timestamp

var time2 = moment('21312'); //can put in timestamp
