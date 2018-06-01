const { Blockchain, Block } = require('./core/index')

let ucoin = new Blockchain()

console.log('Mining block 1');
ucoin.addBlock(new Block(1, new Date(), { type: 'INCOME', amount: 10, label: 'groceries' }, 0))

console.log('Mining block 2');
ucoin.addBlock(new Block(2, new Date(), { type: 'OUTCOME', amount: 30, label: 'udemy course' }, 0))

console.log('Mining block 3');
ucoin.addBlock(new Block(3, new Date(), { type: 'OUTCOME', amount: 130, label: 'withdraw' }, 0))


// console.log('Full Blockhain', JSON.stringify(ucoin, null, 4))

// console.log("Is Blockchain Valid ?", ucoin.isChainValid());

// console.log("Changing a block... (Should invalidate the Blockchain)");

// ucoin.chain[1].data = { amount: 100 };
// ucoin.chain[1].data = ucoin.chain[1].calculateHash();

// console.log("Is the Blockchain valid? " + ucoin.isChainValid());
