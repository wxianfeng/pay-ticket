// 付款地址枚举表
var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable("address",{
    id: { type: 'int', primarykey: true, autoIncrement: true },
    user_id: 'int',
    state: { type: 'string', defaultValue: 'unused' }, // unused: 未使用, used: 已使用
    has_code: 'string',
    created_at: 'datetime',
    updated_at: 'datetime'
  },callback);
};

exports.down = function(db, callback) {

};
