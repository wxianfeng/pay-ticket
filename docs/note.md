要求
====
[TOC]

## 查询 bitcoin 付款信息
https://blockchain.info/q/addressbalance/186kUYv9kEXTkALdkNgeBwCkFaUoD1qVzP?confirmations=1

## 以太坊 付款查询
```
以太坊的价格用 https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2UCZJ8BPCIJU7C24BPVX59JDHTRTDUS4GD 查，result 里面 ethusd 那一项是 1 ETH 对应于多少 USD. 需要做个除法来计算具体的金额

对于以太坊付款，轮询 https://api.etherscan.io/api?module=account&action=balance&address=[地址]&tag=latest&apikey=2UCZJ8BPCIJU7C24BPVX59JDHTRTDUS4GD

如果需要查询多个地址，可以用 https://api.etherscan.io/api?module=account&action=balancemulti&address=[地址1],[地址2],[地址3]&tag=latest&apikey=2UCZJ8BPCIJU7C24BPVX59JDHTRTDUS4GD 每次最多 20 个地址

查出来的余额是，10^18 分之一个以太币，比如余额是 1 后面 18 个 0 的话实际金额就是 1 个以太币[蛋疼]

这个 API 的限制是每秒最多五次，不用轮询得特别频繁，十秒一次应该 OK 了。
```

## 比特币地址
```
之前文档里面应该告诉你地址的例子的

比特币的地址长这样: 1EzwoHtiXB4iFwedPr49iywjZn2nnekhoj
以太币的地址长这样: 0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae

比特币的那个有 Checksum 所以乱写肯定不行

比如这个 1JZiRzqpCSqeKZvCaRJZMKmuFhu1gFzaRz 就是正确的地址
```

## 票价
```
票有三种，还有两个时间段的价格（单位是人民币）

          Early bird | Regular
DEVCON2      5800       7800  
SUMMIT       5800       7800  
WHOLE WEEK   9800      12800  

2016-7-31 之前（包括当天）算 early bird. 之后算 regular.

美元价格用这个

DEVCON2          900       1200  
SUMMIT             900       1200  
WHOLE WEEK   1500      2000
```

## 上线 domain
```
链接的话 server name 都是 payment.blockchainweek2016.org , 不过还是不要 hard code 进去。

主页地址:
http://blockchainweek2016.org/index_en.html
```
