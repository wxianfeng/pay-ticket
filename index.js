// require module
var express = require('express');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');
var dateFormat = require('dateformat');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var rp = require('request-promise');
var requestSync = require('urllib-sync').request;

var config = require('./config/config')

var domain = config.domain;

// email init
var smtpConfig = {
    host: config.emailServer,
    port: config.emailPort,
    auth: {
      user: config.emailUser,
      pass: config.emailPwd
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

// express init
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// mysql init
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

// save email and send first email
app.post("/save-email", function(req, res){
  var email = req.param('email');
  if (/^(.+)@(.+)$/.test(email)) {
  } else {
    res.send({ code: 1, msg: 'email format is error' });
    return;
  }

  connection.query("select * from users where email = ?", email, function(err, result) {
    if (err)
      console.log(err);
    var user = result[0];

    var date = new Date();
    var date = dateFormat(date, "yyyy-mm-dd h:MM:ss");

    var content = [
    "Dear Guests,",
    "You’ve placed an order for tickets of the Shanghai Global Blockchain Week.",
    "(Please ignore this E-mail if you had not ordered such tickets.)",
    "The event will be consist of 3 segments within one week, which are Ethereum DevCon2, Demo Day and 2nd Global Blockchain Summit. Different types of tickets are provided for these segments. The purpose of this E-mail is to connect you with a payment system which allows you to pay for the tickets via Bitcoin or Ether. Please click one of the links below according to the ticket of your choosing, and a payment address for Ether or Bitcoin will be provided. Once the payment is confirmed (1 confirmation for Bitcoin, 10 confirmations for Ether), a coupon code will be provided to this E-mail address which can be used to claim the ticket on our event page on the Event Dove website.<br/>",
    "<b>Pay by Bitcoin</b>",
    "<b>Ticket for DevCon2</b>",
    domain + "/verify?token="+ "{token}" +"&category=bitcoin&ticket_category=2",
    "<b>Ticket for Demo Day and 2nd Global Blockchain Summit Ticket</b>",
    domain + "/verify?token="+ "{token}" +"&category=bitcoin&ticket_category=3",
    "<b>Ticket for the Whole Week</b>",
    domain + "/verify?token=" + "{token}" + "&category=bitcoin&ticket_category=1 <br/>",
    "<b>Pay by Ether</b>",
    "<b>Ticket for DevCon2</b>",
    domain + "/verify?token=" + "{token}" + "&category=ether&ticket_category=2",
    "<b>Ticket for Demo Day and 2nd Global Blockchain Summit</b>",
    domain + "/verify?token=" + "{token}" + "&category=ether&ticket_category=3",
    "<b>Ticket for the Whole Week</b>",
    domain + "/verify?token=" + "{token}" + "&category=ether&ticket_category=1 <br/>",
    "(This E-mail is sent by an automatic system. Please do not reply directly. )"
    ].join("<br/>");

    if (result.length == 0) { // email not exist

      var token = crypto.randomBytes(32).toString('hex');
      console.log(date);
      var sql = "insert into users(email, token, created_at, updated_at) values(\"" + email + "\", \""+  token +"\", \""+  date +"\", \""+ date +"\")";
      console.log(sql);
      connection.query(sql, {}, function(err, result){
        if (err)
          console.log(err);

        content = content.replace(/{token}/g, token);

        sendFirstMail(email, content);

      });
    } else {
      var now_t = Date.parse(date.replace(/-/g, "/"));
      var created_at_t = Date.parse(user.created_at.toString().replace(/-/g, "/"));
      if (now_t - created_at_t > 60) {
        content = content.replace(/{token}/g, user.token);
        sendFirstMail(email, content);
      }
    }

    res.send({ code: 0 });
    
  });

});

// verify token and send second email
app.get("/verify", function(req, res) {
  var token = req.param("token");
  var category = req.param("category");
  var ticket_category = req.param("ticket_category");

  if (undefined == token)
    token = "";

  var address;
  var amount;
  var date = new Date();
  var date = dateFormat(date, "yyyy-mm-dd h:MM:ss");
  if (date <= "2016-07-31 24:00:00") {
    if (category == 'bitcoin') {
      switch (ticket_category) {
        case "1":
          var resp = requestSync("http://blockchain.info/tobtc?currency=USD&value=1500");
          amount = resp.data;
          break;
        case "2":
          var resp = requestSync("http://blockchain.info/tobtc?currency=USD&value=900");
          amount = resp.data;
          break;
        case "3":
          var resp = requestSync("http://blockchain.info/tobtc?currency=USD&value=900");
          amount = resp.data;
      }
    }
  } else {
    if (category == 'bitcoin') {
      switch (ticket_category) {
        case "1":
          var resp = requestSync("http://blockchain.info/tobtc?currency=USD&value=2000");
          amount = resp.data;
          break;
        case "2":
          var resp = requestSync("http://blockchain.info/tobtc?currency=USD&value=1200");
          amount = resp.data;
          break;
        case "3":
          var resp = requestSync("http://blockchain.info/tobtc?currency=USD&value=1200");
          amount = resp.data;
      }
    }
  }

  console.log(amount);

  var content = [
    "Dear Guests,",
    "You’ve ordered Ticket Name and choosed to pay by <b>"+ category +"</b> ",
    "the payment address is <b>"+ "{address}" +"</b> , the amount should be <b>"+ amount +" </b>.",
    "Please finish the payment in 12 hours. Once the payment is confirmed (1 confirmation for Bitcoin, 10 confirmations for Ether), a coupon code will be provided to this E-mail address which can be used to claim the ticket on our event page on the Event Dove website.<br/>",
    
  ].join("<br/>");

  connection.query("select * from users where token = ?", token, function(err, result) {
    if (err)
      console.log(err);
    
    if (result.length == 0) {
      res.send("verify fail!");
      return;
    }

    var receiver = result[0].email;
    var user_id = result[0].id;

    connection.query("select * from invoices where user_id = "+ user_id +" AND category = \""+ category +"\" AND ticket_category = \""+ ticket_category +"\"" + " order by created_at desc limit 1", function(err, result){
      if (err)
        console.log(err);

      console.log(result);

      var invoice = result[0];

      if (result.length != 0) { // 找到 invoice 记录
        if (invoice.state == 'payed') {
          res.send("you have payed");
          return;
        } else if (invoice.state == 'unpay') { // 之前未付款, 继续使用这个 address
          address = invoice.address;
          content = content.replace(/{address}/, address);

          sendSecondMail(receiver, content);
          var html_content = content + "A copy of this invoice has been sent to your email.";
          res.send(html_content);
          return;
        }
      }

      // 未找到 invoice 记录, 取个 address, 生成 invoice
      connection.query("select * from address where state = ? and user_id is NULL limit 1", "unused", function(err, result) {
        address = result[0].hash_code;

        content = content.replace(/{address}/, address);

        var html_content = content + "A copy of this invoice has been sent to your email.";

        var email_content = content + "(This E-mail is sent by an automatic system. Please do not reply directly. )";

        sendSecondMail(receiver, email_content);

        var invoice_sql = "insert into invoices(user_id, address, fee, category, ticket_category, created_at, updated_at) values("+ user_id +",\""+ address +"\",\""+ amount +"\",\""+ category +"\",\""+ ticket_category +"\",\""+ date +"\",\""+ date +"\")";
        connection.query(invoice_sql, function(err, result){
          if (err)
            console.log(err);
        });

        setAddressUsed(result[0].id);

        res.send(html_content);

    })


    });
    
  });

});

function setAddressUsed(id) {
  connection.query("update address set state = ? where id = "+ id +"", "used", function(err, result){
    if (err)
      console.log(err);
  })
}

function sendFirstMail(receiver, email_content) {
  var mailOptions = {
    from: '"Pay-Ticket" <' + config.emailUser + '>',
    to: receiver,
    subject: 'You’ve placed an order for tickets of the Shanghai Global Blockchain Week.',
    html: email_content
  };

  transporter.sendMail(mailOptions, function(error, info){
    console.log('Message sent: ' + info.response);
  });
}

function sendSecondMail(receiver, email_content) {
  var mailOptions = {
    from: '"Pay-Ticket" <'+ config.emailUser +'>',
    to: receiver, 
    subject: 'Please finish the payment for the ticket of Shanghai Blockchain Week.', // Subject line
    html: email_content
  };

  transporter.sendMail(mailOptions, function(error, info) {
    console.log('Message sent: ' + info.response);
  });
}

// create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

