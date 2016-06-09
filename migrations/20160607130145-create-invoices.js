var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable("invoices",{
    id: { type: 'int', primarykey: true, autoIncrement: true },
    user_id: { type: 'int', unique: true, notNull: true },
    fee: 'string',
    category: { type: 'string', defaultValue: 'bitcoin' },// 付款方式 bitcoin, ether
    state: { type: 'string', defaultValue: 'unpay' }, // unpay: 未付款, payed: 已付款
    code: 'string',
    created_at: 'datetime',
    updated_at: 'datetime'
  },callback);
};

exports.down = function(db, callback) {

};
