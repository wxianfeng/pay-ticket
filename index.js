/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');
var dateFormat = require('dateformat');
var nodemailer = require('nodemailer');

var app = express();

var smtpConfig = {
    host: 'smtp.exmail.qq.com',
    port: 25,
    auth: {
        user: 'wxianfeng@wxianfeng.com',
        pass: 'wxf19860104'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

// var transporter = nodemailer.createTransport('smtps://lecai360%40gmail.com:www.lecai360.com@smtp.gmail.com');

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

        var content = [
        "Dear Guests,",
        "You’ve placed an order for tickets of the Shanghai Global Blockchain Week.",
        "(Please ignore this E-mail if you had not ordered such tickets.)",
        "The event will be consist of 3 segments within one week, which are Ethereum DevCon2, Demo Day and 2nd Global Blockchain Summit. Different types of tickets are provided for these segments. The purpose of this E-mail is to connect you with a payment system which allows you to pay for the tickets via Bitcoin or Ether. Please click one of the links below according to the ticket of your choosing, and a payment address for Ether or Bitcoin will be provided. Once the payment is confirmed (1 confirmation for Bitcoin, 10 confirmations for Ether), a coupon code will be provided to this E-mail address which can be used to claim the ticket on our event page on the Event Dove website.<br/>",
        "<b>Pay by Bitcoin</b>",
        "<b>Ticket for DevCon2</b>",
        "https://",
        "<b>Ticket for Demo Day and 2nd Global Blockchain Summit Ticket</b>",
        "https://",
        "<b>Ticket for the Whole Week</b>",
        "https://<br/>",
        "<b>Pay by Ether</b>",
        "<b>Ticket for DevCon2</b>",
        "https://",
        "<b>Ticket for Demo Day and 2nd Global Blockchain Summit</b>",
        "<b>Ticket for the Whole Week</b>",
        "https://",
        "(This E-mail is sent by an automatic system. Please do not reply directly. )"
        ].join("<br/>");

        var mailOptions = {
          from: '"Pay-Ticket" <wxianfeng@wxianfeng.com>', // sender address
          to: '522096432@qq.com', // list of receivers
          subject: 'You’ve placed an order for tickets of the Shanghai Global Blockchain Week.', // Subject line
          html: content
        };

        transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        }
          console.log('Message sent: ' + info.response);
        });

      });
    }

    res.send({ code: 0 });
    
  });

  // res.send({ code: 1, msg: "save email fail" });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

