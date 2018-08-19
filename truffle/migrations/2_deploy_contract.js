var Ballot = artifacts.require("./Ballot.sol");

module.exports = function(deployer) {
  const proposals = ['山田 太郎', '田中 一郎', '高田 花子'];
  deployer.deploy(Ballot, proposals, { gas: 2000000 });
};