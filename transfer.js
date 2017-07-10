var abi = require('../node_modules/ethereumjs-abi')
//var a = abi.methodID('f', ['uint', 'uint32[]', 'bytes10', 'bytes']).toString('hex') + abi.rawEncode(['uint', 'uint32[]', 'bytes10', 'bytes'], [0x123, [0x456, 0x789], '1234567890', 'Hello, world!']).toString('hex')

module.exports = function (callback) {

    const sender = web3.eth.accounts[0]

    var finalize = abi.methodID('transfer', ['address','uint256']).toString('hex')

    var data = abi.rawEncode(['address', 'uint256'], ["0xd0a69af4c3832f16067c27691a4112bda0676903", web3.toWei(2, 'ether') ]).toString('hex')

    const contract_address = "0x77499fd57915542718d184a6924e7adfc437dd3f"

    var abis = abi.rawEncode(['address', 'uint256', 'uint256'], ["0xd0a69af4c3832f16067c27691a4112bda0676903", 1272481, 1272496 ]).toString('hex')
     
    console.log(abis)

    web3.eth.sendTransaction({
      from: sender,
      to: contract_address,
      value: web3.toWei(0, 'ether'),
      data: '0x' + finalize + data
    }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })
}