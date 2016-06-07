/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');
var dateFormat = require('dateformat');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var dbContent = fs.readFileSync(__dirname + "/database.json", "utf8");
var databaseCfg = JSON.parse(dbContent);
var dev = databaseCfg.development;

var connection = mysql.createConnection({
  host     : dev.host,
  user     : dev.user,
  password : dev.password,
  database: dev.database
});

connection.connect();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// save email
app.post("/save-email", function(req, res){
  var email = req.param('email');
  connection.query("select 1 from users where email = ?", email, function(err, result){
    console.log(err);
    console.log(result);
    console.log("-----------------------");

    if (result.length == 0) { // email not exist
      var date = new Date();
      var date = dateFormat(date, "yyyy-mm-dd h:MM:ss");
      console.log(date);
      var sql = "insert into users(email, created_at, updated_at) values(\"" + email + "\", \""+  date +"\", \""+ date +"\")";
      console.log(sql);
      connection.query(sql, {}, function(err, result){
        console.log(err);
        console.log(result);
      });
    }

    res.send({ code: 0 });
    
  });

  // res.send({ code: 1, msg: "save email fail" });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

