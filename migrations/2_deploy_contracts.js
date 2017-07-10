var SaintArnouldToken = artifacts.require("./SaintArnouldToken.sol");

module.exports = function (deployer, net, accounts) {
  deployer.deploy(SaintArnouldToken, accounts[0], 4002944, 4066607);
};
