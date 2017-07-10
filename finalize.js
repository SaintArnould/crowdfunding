var abi = require('../node_modules/ethereumjs-abi')
//var a = abi.methodID('f', ['uint', 'uint32[]', 'bytes10', 'bytes']).toString('hex') + abi.rawEncode(['uint', 'uint32[]', 'bytes10', 'bytes'], [0x123, [0x456, 0x789], '1234567890', 'Hello, world!']).toString('hex')

module.exports = function (callback) {

    const sender = web3.eth.accounts[0]

    var finalize = abi.methodID('finalize', []).toString('hex')

    const contract_address = "0x139b127413EdcEc4574b4750d24b6cF558b6B1d3"


    web3.eth.sendTransaction({
      from: sender,
      to: contract_address,
      value: web3.toWei(0, 'ether'),
      data: '0x' + finalize
    }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })
}