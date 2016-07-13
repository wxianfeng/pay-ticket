var dateFormat = require('dateformat');

var date = new Date();
var date = dateFormat(date, "yyyy-mm-dd h:MM:ss");
console.log(date);
if (date <= "2016-07-31 24:00:00") {
  console.log(true); // puts true
} else {
  console.log(false);
}

var date2 = new Date("2016-08-01 23:59:59")
var date2 = dateFormat(date2, "yyyy-mm-dd h:MM:ss");
console.log(date2);
if (date2 <= "2016-07-31 24:00:00") {
  console.log(true);
} else {
  console.log(false); // puts false
}


var date3 = new Date();
console.log(date3.toUTCString());
var date3_utc = dateFormat(date3, "UTC:yyyy-mm-dd HH:MM:ss");
console.log(date3_utc); // 2016-07-13 1:39:05
var date_beijing = dateFormat(date3, "yyyy-mm-dd HH:MM:ss");
console.log(date_beijing); // 2016-07-13 9:39:05
