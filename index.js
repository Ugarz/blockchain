const SHA256 = require('crypto-js/SHA256');

class Block {
    /**
     * Block parameters
     * @param {*} index Tells where the block is on the chain
     * @param {*} timestamp Tells when the block was created
     * @param {ojbect} data The data to associate with the block
     * @param {string} previousHash The previous hash (important, ensure integrity)
     */
    constructor (index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    
    /**
     * calculateHash the hash based on the previous hash
     */
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString());
    }
}

/**
 * Our blockhain
 */
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "30/05/2018", "Genesis Block", "0");
  }

  get latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock.hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  /**
   *
   * Check if the blockchain is valid
   * @returns
   * @memberof Blockchain
   */
  ifChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];
    
      if (currentBlock.hash !== currentBlock.calculateHash()) {
          console.log("The hash of the current block is not equal to the previous one", {currentBlock});
          return false;
        }
        if(currentBlock.previousHash !== previousBlock.hash){
            console.log("The current block");
            return false;
      }
      return true;
    }
  }
}

let ucoin = new Blockchain()
ucoin.addBlock(new Block(1, new Date(), {amount: 10, label: 'groceries'}))
ucoin.addBlock(new Block(2, new Date(), {amount: 30, label: 'udemy course'}))

console.log("Is Blockchain Valid ?", ucoin.ifChainValid());

//console.log('Blockhain', JSON.stringify(ucoin, null, 4))