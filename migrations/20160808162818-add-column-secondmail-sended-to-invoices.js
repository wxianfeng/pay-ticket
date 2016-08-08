var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('invoices','secondmail_sended','string',callback);
};

exports.down = function(db, callback) {

};
