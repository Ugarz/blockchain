const signale = require("signale");

const { Blockchain, Block } = require("./core/index");

let ucoin = new Blockchain();

ucoin.addBlock(
  new Block(1, new Date(), { type: "INCOME", amount: 10, label: "groceries" })
);
ucoin.addBlock(
  new Block(2, new Date(), {
    type: "OUTCOME",
    amount: 30,
    label: "udemy course"
  })
);

// signale.info('Full Blockhain', JSON.stringify(ucoin, null, 4))

signale.info("Is Blockchain Valid ?", ucoin.isChainValid());
