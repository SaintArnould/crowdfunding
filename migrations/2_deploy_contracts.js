var SaintArnouldToken = artifacts.require("./SaintArnouldToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SaintArnouldToken, "0x607e64ea385a0fcc92f40a49d4a1fa2603ef45a8", 200, 2000);
};
