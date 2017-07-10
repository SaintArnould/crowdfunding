const SaintArnouldToken = artifacts.require("SaintArnouldToken.sol");
const rx = require('rx')

let meta;
const sblock = 1272315
const eblock = 1272343
const sendETH = 50


contract('SaintArnould', function (accounts) {
  const owner = accounts[0]
  const sender = accounts[1]

  it("should deploy ico contract", function (done) {
    SaintArnouldToken.deployed().then(function (instance) {
      meta = instance;
      done()
    })
  });
  it(`should be blocktime start= ${startblock} end= ${endblock}`, function (done) {
    meta.fundingStartBlock.call().then(function (startblock) {
      // console.log(startblock.toNumber())
      assert.equal(startblock.toNumber(), sblock, "startblock is not match");
      return meta.fundingEndBlock.call().then((function (endblock) {
        // console.log(endblock.toNumber())
        assert.equal(endblock.toNumber(), eblock, "endblock is not match");

        done()
      }))
    })
  })
  it("should be avalable to call a crowdsale start", function (done) {

    source = rx.Observable.create((observer) => {
      const getblock = () => {
        //console.log(`blocktime = ${web3.eth.blockNumber}`)
        meta.owner_blance = web3.eth.getBalance(owner).toNumber()

        web3.eth.sendTransaction({
          from: sender,
          to: meta.address,
          value: web3.toWei(sendETH, 'ether'),
          gas: 200000,
          gasPrice: 50000000000
        }, (err, result) => {
          if (err) {
            setTimeout(() => {
              getblock()
            }, 500)
          } else {
            observer.onNext(result)

          }
        })

      }
      getblock()

    })

    source.subscribe(x => {

      meta.balanceOf.call(sender).then((balance) => {
        const sender_token_balance = balance.toNumber()
        const sender_balance = web3.eth.getBalance(sender).toNumber()
        const owner_eth_balance = web3.eth.getBalance(owner).toNumber()
        const contract_balance = web3.eth.getBalance(meta.address).toNumber()
        assert.equal(owner_eth_balance, meta.owner_blance + (sendETH * 1e18), "receive owner balance is not match");
        assert.equal(sender_token_balance, sendETH * 5000 * 1e18, "sender token balance is not match");
        assert.equal(contract_balance, 0, "contract balance is not match");

        done()
      })

    }, e => {

    }, () => {

    })
  })



  it("should be unable to investment for call a crowdsale ended", function (done) {

    source = rx.Observable.create((observer) => {
      const getblock = () => {
        //console.log(`blocktime = ${web3.eth.blockNumber}`)
        meta.finalize({
          from: owner
        }).then((result) => {
          observer.onNext(result)

        }).catch((err) => {
          setTimeout(() => {
            getblock()
          }, 500)
        })

      }
      getblock()
    })
    source.subscribe(x => {
      web3.eth.sendTransaction({
        from: sender,
        to: meta.address,
        value: web3.toWei(20, 'ether'),
        gas: 200000,
        gasPrice: 50000000000
      }, (err, result) => {
        if (err) {
          meta.funding_ended.call().then((result) => {
            assert.equal(result, true, "funding is not ended.");
            return meta.balanceOf.call(owner)
          }).then((result) => {
            const owner_token_value = result.toNumber()
            assert.equal(owner_token_value, sendETH * 5000 * 1e18 * 10 / 100, "funding is not ended.");
            done()

          })
        } else {
          //observer.onNext(result)
        }
      })
    })
  })

  it("should be unable to sendOwnerToken over six month", function (done) {
    source = rx.Observable.create((observer) => {
      const getblock = () => {
        // console.log(`blocktime = ${web3.eth.blockNumber}`)
        meta.transferFounders("0xda5c805cfcf76ccc44ba616e0898ef1e33286063", web3.toWei(20, 'ether'), {
          from: owner
        }).then((result) => {
          observer.onNext(result)

        }).catch((err) => {
          setTimeout(() => {
            getblock()
          }, 50)
        })

      }
      getblock()
    })
    source.subscribe(x => {
      meta.balanceOf.call("0xda5c805cfcf76ccc44ba616e0898ef1e33286063").then((result) => {
        assert.equal(result.toNumber(), 20 * 1e18, "transfer hasn't been operated.");
        return meta.transfer("0xda5c805cfcf76ccc44ba616e0898ef1e33286063", web3.toWei(10, 'ether'), {
          from: sender
        })
      }).then((result) => {
        return meta.balanceOf.call("0xda5c805cfcf76ccc44ba616e0898ef1e33286063")
      }).then((result) => {
        assert.equal(result.toNumber(), 30 * 1e18, "transfer hasn't been operated.");
        done()
      })

    })
  })
});