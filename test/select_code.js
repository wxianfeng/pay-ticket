var mysql = require('mysql');
var fs = require('fs');
var sleep = require('sleep');
var dbContent = fs.readFileSync(__dirname + "/database.json", "utf8");
var databaseCfg = JSON.parse(dbContent);
var dev = databaseCfg.development;

function setCodeUsed(id) {
  var connection2 = mysql.createConnection({
    host     : dev.host,
    user     : dev.user,
    password : dev.password,
    database: dev.database
  });

  connection2.connect();
  connection2.query("update codes set state = ? where id = "+ id +"", "used", function(err, result){
    if (err)
      console.log("update code state error: " +  err);

    connection2.end();
  })
  
}

var arr = [1,2,3];

// 输出 1 - 10
arr.forEach(function(ele, i) {

  var connection9 = mysql.createConnection({
    host     : dev.host,
    user     : dev.user,
    password : dev.password,
    database: dev.database
  });
  connection9.connect();

  connection9.query("select * from codes where state = ? and ticket_category = ? limit ?", ["unused", 1, arr.length], function(err, result) {

    console.log(i);
    console.log(result[i].id);

    setCodeUsed(result[i].id);

    connection9.end();

  });


});

