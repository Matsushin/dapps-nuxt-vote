var Ballot = artifacts.require("./Ballot.sol");

module.exports = function(deployer) {
  const proposals = ['山田 太郎', 'Tanaka Ichiro', 'Takada Hanako'];
  deployer.deploy(Ballot, proposals, { gas: 2000000 });
};