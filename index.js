/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
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
// app.use(express.static(path.join(__dirname, 'public')));



// var dbContent = fs.readFileSync(__dirname + "/database.json", "utf8");
// var databaseCfg = JSON.parse(dbContent);
// var dev = databaseCfg.development;

// var connection = mysql.createConnection({
//   host     : dev.host,
//   user     : dev.user,
//   password : dev.password,
//   database: dev.database
// });

// connection.connect();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

