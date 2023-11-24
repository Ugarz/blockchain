import { expect } from 'chai'
import {
  Block,
  calculateHash,
  createBlock,
  isValidBlock,
  addBlock,
} from '../src/blockchain'

describe('Blockchain', () => {
  let initialBlockchain: Block[]

  beforeEach(() => {
    initialBlockchain = [
      {
        index: 0,
        previousHash: '0',
        timestamp: Math.floor(new Date().getTime() / 1000),
        data: 'Genesis Block',
        hash: '',
      },
    ]
  })

  it('should create a valid block', () => {
    const newBlock = createBlock(1, 'previousHash', 'Transaction Data')
    expect(newBlock.index).to.equal(1)
    expect(newBlock.previousHash).to.equal('previousHash')
    expect(newBlock.data).to.equal('Transaction Data')
    expect(newBlock.hash).to.equal(calculateHash(newBlock))
  })

  it('should validate a valid block', () => {
    const previousBlock: Block = initialBlockchain[0]
    const newBlock = createBlock(1, previousBlock.hash, 'Transaction Data')
    const isValid = isValidBlock(previousBlock, newBlock)
    expect(isValid).to.be.true
  })

  it('should add a valid block to the blockchain', () => {
    const data = 'Transaction Data'
    const updatedBlockchain = addBlock(initialBlockchain, data)
    const newBlock = updatedBlockchain[0]

    expect(updatedBlockchain.length).to.equal(2)
    expect(newBlock.index).to.equal(1)
    expect(newBlock.previousHash).to.equal(initialBlockchain[0].hash)
    expect(newBlock.data).to.equal(data)
    expect(isValidBlock(initialBlockchain[0], newBlock)).to.be.true
  })
})
