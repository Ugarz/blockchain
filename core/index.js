const crypto = require('crypto');

class Block {
    /**
     * Block parameters
     * @param {*} index Tells where the block is on the chain
     * @param {*} timestamp Tells when the block was created
     * @param {ojbect} data The data to associate with the block
     * @param {string} previousHash The previous hash (important, ensure integrity)
     */
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    /**
     * calculateHash the hash based on the previous hash
     */
    calculateHash() {
        // const secret = 'abcdefg';
        const secret = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString();
        const hash = crypto.createHmac('sha256', secret).digest('hex');
        return hash;
        // const secret = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString();
        // console.log('secret', secret)
        // return SHA256(secret);
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
    }
    /**
     * Create the first Block in the Blockchain
     */
    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    /**
     * Get the lastest Block in the Blockchain
     */
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        // Stock previousBlockHash in currentBlock
        newBlock.previousHash = this.latestBlock.hash;
        // Calculate hash for the new Block
        newBlock.hash = newBlock.calculateHash();
        // Puch the new Block in our Blockchain
        this.chain.push(newBlock);
    }

    /**
     *
     * Check if the blockchain is valid
     * @returns
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