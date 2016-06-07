var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable("users",{
    id: { type: 'int', primarykey: true, autoIncrement: true },
    email: { type: 'string', unique: true, notNull: true },
    token: 'string',
    created_at: 'datetime',
    updated_at: 'datetime'
  },callback);
};

exports.down = function(db, callback) {

};
