表结构设计
====

1. users 用户表
email varchar
token varchar
created_at datetime
updated_at datetime

2. invoices 收款单
user_id 用户id
fee string 金额
category string 票的种类
state string 付款状态
code string 领票码
created_at datetime
updated_at datetime

