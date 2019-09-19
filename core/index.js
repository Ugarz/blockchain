/**
 * Global dependencies
 */
const crypto = require("crypto");
const signale = require("signale");

/**
 * Local dependencies
 */
const { isRequired } = require("./helpers/validation");

/**
 * The Block Class
 * @example
 * const { Blockchain, Block } = require('blockchain')
 * const myNewBlockchain = new Blockchain()
 * const transactionData = {
        type: 'INCOME',
        amount: 10,
        label: 'groceries'
    }
 * myNewBlockchain.addBlock(new Block(1, '2018-10-25', transactionData))
 */
class Block {
  /**
   * Block parameters
   * @class
   * @param {integer} index - Tells where the block is on the chain
   * @param {string} timestamp - Tells when the block was created
   * @param {Object} data - The data to associate with the block
   * @param {string} previousHash - The previous hash (important, ensure integrity)
   */
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  /**
   * calculateHash the hash based on the previous hash
   * @memberof Block
   * @private
   * @instance
   */
  calculateHash() {
    signale.info("|> Calculate hash..");
    const secret =
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data).toString();
    const hash = crypto.createHmac("sha256", secret).digest("hex");
    signale.success("|> hash ok");
    return hash;
  }
  /**
   * Mining Block with it
   * @returns {Object} minedBlock - The Block mined
   * @memberof Block
   */
  mine() {
    signale.info("Start mining..");

    const mine = (time = 3000) =>
      new Promise((rej, res) => {
        console.log(`Mining for ${time}ms`);

        return setTimeout(() => {
          res({ hash: "azerty", time });
        }, time);
        rej({ hash: "nope" });
      });

    return mine(200);
  }
}

/**
 * The Blockhain Class
 */
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }
  /**
   * createGenesisBlock
   * @description Called for the first time on Blockchain creation
   * @returns {Object} firstBlock - The first Block ofr the Blockchain
   * @memberof Blockchain
   * @private
   */
  createGenesisBlock() {
    return new Block(0, "2017-01-01", "Genesis block", "0");
  }

  /**
   * latestBlock
   * @description Get the lastest Block in the Blockchain
   * @returns {array} lastBlock - Return the last block
   * @memberof Blockchain
   * @example
   * const latestBlock = Blockchain.latestBlock;
   */
  get latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
     * addBlock
     * @description Add a new Block to the Blockchain
     * @param {Object} newBlock - Add a new Block 
     * @memberof Blockchain
     * @example
     * const { Blockchain, Block } = require('blockchain')
     * const myNewBlockchain = new Blockchain()
     * const transactionData = {
             type: 'INCOME',
             amount: 10,
             label: 'groceries'
         }
     * myNewBlockchain.addBlock(new Block(1, '2018-10-25', transactionData))
     */
  addBlock(newBlock) {
    // Stock previousBlockHash in currentBlock
    newBlock.previousHash = this.latestBlock.hash;
    // Calculate hash for the new Block
    newBlock.hash = newBlock.calculateHash();
    // Push the new Block in our Blockchain
    this.chain.push(newBlock);
  }

  /**
   * @description Check if the blockchain is valid
   * @returns {boolean} isBlockchainValid - The result if the chain is valid
   * @memberof Blockchain
   * @example
   * const result = blockchain.isChainValid();
   */
  isChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        const obj = {
          currentHash: currentBlock.hash,
          calc: currentBlock.calculateHash()
        };
        signale.error(
          "The hash of the current block is not equal to the previous one",
          JSON.stringify(obj, null, 2)
        );
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log("The current block");
        return false;
      }
      return true;
    }
  }
}

module.exports = {
  Block,
  Blockchain
};
