const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1"); //basis of Bitcoin wallet's algorithm

const myKey = ec.keyFromPrivate(
  "4e4e8966d03e0e3e0ae18c7399cdd1cd71858b855b5629e581cdda3d41e9cc5b"
);
const myWalletAddress = myKey.getPublic("hex");

/*
let testBlock = new Blockchain();
testBlock.addBlock(new Block(1, "02/09/2021", { amount: 4 }));
testBlock.addBlock(new Block(2, "02/10/2021", { amount: 10 }));
console.log(JSON.stringify(testBlock, null, 4));
console.log("Is blockchain valid? " + testBlock.isChainValid());

testBlock.chain[1].transactions = { amount: 100 };
testBlock.chain[1].hash = testBlock.chain[1].calculateHash();
console.log("Is blockchain valid? " + testBlock.isChainValid());
*/
/*
let testBlock = new Blockchain();
console.log("Mining block1 ...");
testBlock.addBlock(new Block(1, "02/09/2021", { amount: 4 }));
console.log("Mining block2 ...");
testBlock.addBlock(new Block(2, "02/10/2021", { amount: 10 }));
*/
/*
let testBlock = new Blockchain();
testBlock.createTransaction(new Transaction("address1", "address2", 100));
testBlock.createTransaction(new Transaction("address2", "address1", 50));

console.log("\nStrating the miner...");
testBlock.minePendingTransactions("myWalletAddress");
console.log(
  "\nBalance of my wallet is",
  testBlock.getBalanceOfAddress("myWalletAddress")
);
console.log("\nStrating the miner...");
testBlock.minePendingTransactions("myWalletAddress");
console.log(
  "\nBalance of my wallet is",
  testBlock.getBalanceOfAddress("myWalletAddress")
);
*/
let testBlock = new Blockchain();
const tx1 = new Transaction(myWalletAddress, "public key goes here", 10);
tx1.signTransaction(myKey);
testBlock.addTransaction(tx1);

console.log("\nStrating the miner...");
testBlock.minePendingTransactions(myWalletAddress);
console.log(
  "\nBalance of my wallet is",
  testBlock.getBalanceOfAddress(myWalletAddress)
);
console.log("Is chain valid?", testBlock.isChainValid());
testBlock.chain[1].transactions[0].amount = 1;
console.log("Is chain valid?", testBlock.isChainValid());
