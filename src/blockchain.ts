import * as crypto from 'crypto'
import signale from 'signale'

export interface Block {
  index: number
  previousHash: string
  timestamp: number
  data: string
  hash: string
}

export function calculateHash(block: Block): string {
  signale.info('|> Calculating hash')
  const dataToHash =
    block.index + block.previousHash + block.timestamp + block.data
  return crypto.createHash('sha256').update(dataToHash).digest('hex')
}

export function createBlock(
  index: number,
  previousHash: string,
  data: string
): Block {
  signale.info('|> Creating new block')
  const timestamp = Math.floor(new Date().getTime() / 1000)
  const hash = calculateHash({ index, previousHash, timestamp, data, hash: '' })
  return { index, previousHash, timestamp, data, hash }
}

// Function to validate a block
export function isValidBlock(previousBlock: Block, newBlock: Block): boolean {
  signale.info('|> Verify block')
  return (
    newBlock.index === previousBlock.index + 1 &&
    newBlock.previousHash === previousBlock.hash &&
    newBlock.hash === calculateHash(newBlock)
  )
}

// Function to add a new block to the blockchain
export function addBlock(blockchain: Block[], data: string): Block[] {
  signale.info('|> Add new block')
  const previousBlock = blockchain[0]
  const newBlock = createBlock(
    previousBlock.index + 1,
    previousBlock.hash,
    data
  )

  if (isValidBlock(previousBlock, newBlock)) {
    signale.success('|> Block Validated')
    return [newBlock, ...blockchain]
  }

  return blockchain
}
signale.info('|> Initiate Blockchain')
const initialBlockchain: Block[] = [
  {
    index: 0,
    previousHash: '0',
    timestamp: Math.floor(new Date().getTime() / 1000),
    data: 'Genesis Block',
    hash: 'hello world',
  },
]

// Example of using the functions to add a new block
const updatedBlockchain = addBlock(initialBlockchain, 'Transaction Data')

// Print the updated blockchain
updatedBlockchain.forEach((block) => {
  signale.debug('|> Update chain')
  console.log(`Index: ${block.index}, Hash: ${block.hash}`)
})
