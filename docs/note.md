## 查询 bitcoin 付款信息
https://blockchain.info/q/addressbalance/asd?confirmations=1

## 以太坊 付款查询
```
以太坊的价格用 https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2UCZJ8BPCIJU7C24BPVX59JDHTRTDUS4GD 查，result 里面 ethusd 那一项是 1 ETH 对应于多少 USD. 需要做个除法来计算具体的金额

对于以太坊付款，轮询 https://api.etherscan.io/api?module=account&action=balance&address=[地址]&tag=latest&apikey=2UCZJ8BPCIJU7C24BPVX59JDHTRTDUS4GD

如果需要查询多个地址，可以用 https://api.etherscan.io/api?module=account&action=balancemulti&address=[地址1],[地址2],[地址3]&tag=latest&apikey=2UCZJ8BPCIJU7C24BPVX59JDHTRTDUS4GD 每次最多 20 个地址

查出来的余额是，10^18 分之一个以太币，比如余额是 1 后面 18 个 0 的话实际金额就是 1 个以太币[蛋疼]

这个 API 的限制是每秒最多五次，不用轮询得特别频繁，十秒一次应该 OK 了。
```