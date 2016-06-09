var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('invoices','ticket_category','string',callback); // 付款方式 1: Ticket for the Whole Week, 2: Ticket for DevCon2 , 3: Ticket for Demo Day and 2nd Global Blockchain Summit Ticket
};

exports.down = function(db, callback) {

};
