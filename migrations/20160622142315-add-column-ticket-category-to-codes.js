var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('codes','ticket_category','string',callback);
};

exports.down = function(db, callback) {

};
