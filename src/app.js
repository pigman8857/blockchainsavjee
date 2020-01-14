const {BlockChain,Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('4ed9a08719c00668203c2494df6ae6c1bd842a1bcc31e721d00b7e8fdb22c136');
const myWalletAddress = myKey.getPublic('hex');
console.log(`my wallet address ${myWalletAddress}`);
let savjeeCoin = new BlockChain();
console.log(savjeeCoin);

const txn1 = new Transaction(myWalletAddress, 'public key goes here', 10);
txn1.signTransaction(myKey);
savjeeCoin.addTransaction(txn1);

console.log('\n Starting the miner');
savjeeCoin.minePendingTransactions(myWalletAddress);
console.log('\nbalance of xavier is', savjeeCoin.getBalanceOfAddress(myWalletAddress));
