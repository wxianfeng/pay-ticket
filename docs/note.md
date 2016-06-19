要求
====
[TOC]

## TODO
```
现在还有几点。Email, 要检查一下。现在随便填什么都可以... [done]
另外 Email 提交了一次就不会再发邮件，这个感觉不太好。用时间检查一下吧，如果两次提交间隔超过 60s 就重发一次。 [done]
另外邮件的 HTML 能稍微整好看点么，就是昨天说的, 现在是 plain text

兄弟，还有几件事。

一个是之前说的邮件的 HTML 稍微整一下。

另一个是导入地址，我看了一眼，pay-ticket/import_address 现在是手写进去的，能不能直接读一个文件，每行一个地址然后把内容写进去。我建议建个 data/ 的文件夹然后里面放两个文本，一个是 BTC 的，一个是 ETH 的，然后这两个文件的地址从 config 里面读。 [done]

另外以太坊的价格逻辑没有加进去... 

最后第二封邮件的文字里面加个单位吧，"the payment address is <b>"+ "{address}" +"</b> , the amount should be <b>"+ amount +" </b>.", 末尾加上单位。

哦还有，现在的 requestSync 如果 http 请求出错整个应用都挂掉了，这个能不能解决一下... async 的 request 会不会好点?

最后邮件服务器要怎么配置一下才能避免 Gmail 提示 "Gmail couldn't verify that this message was sent by ..." 要是可以的话希望解决一下。

另外比特币价格查询的那段逻辑好像有个大问题，就是我原来文档里面说的

这个余额的单位是一亿分之一个比特币。比如查出来余额是 50000000 的话就表示地址的余额是 0.5 个比特币。

你没做换算啊...

最后那个逻辑要弄对啊。另外以太坊的更加夸张，查出来的数字是金额的 10^18 倍，JavaScript 里面会 overflow, 建议先当字符串处理去掉末尾的再换算。

时间有点紧了，今天晚上能弄?
```

## 查询 bitcoin 付款信息
https://blockchain.info/q/addressbalance/186kUYv9kEXTkALdkNgeBwCkFaUoD1qVzP?confirmations=1

## 查询 bitcoin 和 美元汇率
```
https://blockchain.info/tobtc?currency=USD&value=500
```

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
