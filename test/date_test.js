var dateFormat = require('dateformat');
// var exec = require('child_process').execSync;

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

// exec('export TZ=Asia/Shanghai');


process.env.TZ = 'Asia/Shanghai';
console.log(process.env.TZ);

var date3 = new Date();
console.log(date3);
console.log(date3.toUTCString());
var date3_utc = dateFormat(date3, "UTC:yyyy-mm-dd HH:MM:ss");
console.log(date3_utc); // 2016-07-14 03:40:51
var date_beijing = dateFormat(date3, "yyyy-mm-dd HH:MM:ss");
console.log(date_beijing); // 2016-07-14 11:40:51

var date_zone = dateFormat(date3, "o");
console.log(date_zone);
