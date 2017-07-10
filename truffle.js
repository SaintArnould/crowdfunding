module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 1700000,
      gasPrice: 20000000000
    }
  }
};
