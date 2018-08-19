require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.MNEMONIC;
var accessToken = process.env.INFURA_ACCESSTOKEN;
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
        host: "localhost",
        port: 7545,
        network_id: "10",
        gas: 4600000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/" + accessToken
        );
      },
      network_id: 3,
      gas: 4600000
    }
  }
};