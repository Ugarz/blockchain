const { Blockchain, Block } = require('./core/index')

let ucoin = new Blockchain()

ucoin.addBlock(new Block(1, new Date(), { type: 'INCOME', amount: 10, label: 'groceries' }))
ucoin.addBlock(new Block(2, new Date(), { type: 'OUTCOME', amount: 30, label: 'udemy course' }))

console.log('Full Blockhain', JSON.stringify(ucoin, null, 4))

console.log("Is Blockchain Valid ?", ucoin.isChainValid());

console.log("Changing a block... (Should invalidate the Blockchain)");
ucoin.chain[1].data = { amount: 100 };

console.log("Is the Blockchain valid? " + ucoin.isChainValid());
