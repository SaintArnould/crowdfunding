//var a = abi.methodID('f', ['uint', 'uint32[]', 'bytes10', 'bytes']).toString('hex') + abi.rawEncode(['uint', 'uint32[]', 'bytes10', 'bytes'], [0x123, [0x456, 0x789], '1234567890', 'Hello, world!']).toString('hex')

module.exports = function (callback) {

    const sender = web3.eth.accounts[1]
    const contract_address = "0x77499fd57915542718d184a6924e7adfc437dd3f"

    web3.eth.sendTransaction({
      from: sender,
      to: contract_address,
      value: web3.toWei(0.1, 'ether')
    }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })
}