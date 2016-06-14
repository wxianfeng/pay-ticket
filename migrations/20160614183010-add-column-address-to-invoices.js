var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('invoices','address','string',callback); // 付款地址
};

exports.down = function(db, callback) {

};
