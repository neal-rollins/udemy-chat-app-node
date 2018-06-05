var moment = require('moment');

// var date = new Date();
// var months
// console.log(date.getMonth());

var createdAt = 2235;

var date = moment(createdAt);
console.log(date.format('h:mm:ss a'));
