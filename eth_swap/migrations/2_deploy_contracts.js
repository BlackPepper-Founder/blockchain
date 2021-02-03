//truffle migrate
//truffle console
//contract = await EthSwap.deployed()
//contract
//contract.address
//name = await contract.name()
//truffle migrate --reset
//truffle console
//token = await Token.deployed()
//ethSwap = await EthSwap.deployed()
//balance = await token.balanceOf(ethSwap.address)
//balance.toString()
//.exit
//control + c
const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  //Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  //Deploy EthSwap
  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();

  //Transfer all tokens to EthSwap (1 million)
  await token.transfer(ethSwap.address, "1000000000000000000000000");
};
//truffle migrate --reset
