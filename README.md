# SaintArnould (Tokyo) Token and CrowdSale Contracts

## Getting started
ICO(イニシャルコインオファリング)はEtheruem上のスマートコントラクトで自動生成されます。

1. 発行上限はなし。 1 ETH = 5000 SAT
2. セール期間は `fundingStartBlock` から `fundingEndBlock`まで
3. 発行者はセール終了後販売量の10%を追加で発行し6ヶ月間ロックする。

ご質問は [@syrohei](https://twitter.com/syrohei)　もしくは syrohei@gmail.com　まで。

仕様環境
- Truffle v3.2.5
- EthereumJS TestRPC v3.0.3
- Node.js v6.9.2

```
npm install
truffle migrate
```

## Test

To run the tests, run a TestRPC locally with testrpc -b 1 and run this code.

```
truffle test
```


## LICENSE

MIT
