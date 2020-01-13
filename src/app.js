const SHA256 = require("crypto-js/sha256");

class Transaction{
  constructor(fromAddress, toAddress, amount){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}
class Block {
  constructor(timestamp, transaction, previousHash = "") {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      `${this.previousHash}${this.timestamp$}${JSON.stringify(
        this.transaction
      )}${this.nonce}`
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("01/01/2020", [], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransaction(miningRewardAddress){
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');

    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null,miningRewardAddress,this.miningReward)
    ];
  }

  createTransaction(transaction){
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address){
    let balance  = 0;
    for (const block of this.chain) {
      for (const trans of block.transaction) {
        if(trans.fromAddress === address){
          balance -= trans.amount;
        }

        if(trans.toAddress === address){
          balance  += trans.amount;
        }
      }
    }

    return balance;
  }

  /*
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);

    this.chain.push(newBlock);
  }*/

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let savjeeCoin = new BlockChain();
console.log(savjeeCoin);
savjeeCoin.createTransaction(new Transaction('address1','address2',100));
savjeeCoin.createTransaction(new Transaction('address2','address1',50));

console.log('\n Starting the miner');

savjeeCoin.minePendingTransaction('xavier-address');

console.log('\nbalance of xavier is', savjeeCoin.getBalanceOfAddress('xavier-address'));


console.log('\n Starting the miner gain');

savjeeCoin.minePendingTransaction('xavier-address');

console.log('\nbalance of xavier is', savjeeCoin.getBalanceOfAddress('xavier-address'));
console.log(JSON.stringify(savjeeCoin).toString());