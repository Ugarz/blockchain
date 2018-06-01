const crypto = require('crypto');

class Block {
  /**
   * Block parameters
   * @param {integer} index Tells where the block is on the chain
   * @param {string} timestamp Tells when the block was created
   * @param {ojbect} data The data to associate with the block
   * @param {string} previousHash The previous hash (important, ensure integrity)
   */
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nounce = 0;
    this.hash = this.calculateHash();
    this.report = 0;
  }

  /**
   * calculateHash the hash based on the previous hash
   * @return {string} Return the hash
   */
  calculateHash() {
    const secret = (this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
    const hash = crypto.createHmac("sha256", secret).digest("hex");
    return hash;
  }
  
  /**
   * Mine a block
   * @param {integer} The difficulty to mine a Block
   */
  mineBlock(difficulty) {
    let challenge = this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    console.log('Passing challenge..')
    
    while (challenge) {
      this.nounce++;
      this.report++;
      this.hash = this.calculateHash();
      challenge = this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0");
    //   console.log('hash', this.hash);
    }
    
    console.log(`ATTEMPTS: ${this.report}`);
    console.log(`BLOCK MINED: ${this.hash}`);
  }
}

/**
 * Our blockhain
 */
class Blockchain {
    /**
     * The Blockchain 
     */
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }
    /**
     * Create the first Block in the Blockchain
     */
    createGenesisBlock() {
        return new Block(0, "31/04/2018", { title: "Genesis block" }, "0");
    }

    /**
     * Get the lastest Block in the Blockchain
     */
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock) {
        console.log('Adding a Block to the Blockchain...');
        // Stock previousBlockHash in currentBlock
        newBlock.previousHash = this.latestBlock.hash;
        
        // Calculate hash for the new Block
        // newBlock.hash = newBlock.calculateHash();

        // Mine a Bloack according a given difficulty
        newBlock.mineBlock(this.difficulty);

        // Push the new Block in our Blockchain
        this.chain.push(newBlock);
    }

    /**
     *
     * Check if the blockchain is valid
     * @returns {boolean} Returns true or false for a Blockchain status
     * @memberof Blockchain
     */
    isChainValid() {
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                const obj = { currentHash: currentBlock.hash, calc: currentBlock.calculateHash() }
                console.log("The hash of the current block is not equal to the previous one", JSON.stringify(obj, null, 2));
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
}