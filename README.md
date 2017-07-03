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

## Contract Audit 

このコントラクトは現在監査中です。もしバグが見つかった場合には速やかにTwitterを通し監査報告をすることとします。

2017/7/3 17:00 - Contract Test and Deployment process test has been verified.　

2017/7/3 17:04 - コントラクトのバグ調査を開始、約72時間後に監査が完了しmasterブランチにマージされる予定です。

## Fnctions 
```
function transfer(address _to, uint256 _value) public returns (bool) { }
```
セールで購入されたアドレスはこのfunctionをコールしてトークンを送信します。

```
function buy(address _sender) internal { }
```
購入function。トリガーはコントラクトに着金した時

```
function finalize() external { }
```
セール終了後のコントラクト制御を制限します。また、トークン送金が可能になります。

function transferFounders(address _to, uint256 _value) public returns (bool) { }

ファウンダーのトークンはロックされており、あるblocktimeに到達しない限り送信されることはありません。
ファウンダーは通常の`transfer()`を使うことができないことに注意してください。

## Test

To run the tests, run a TestRPC locally with testrpc -b 1 and run this code.

```
truffle test
```


## LICENSE

MIT
