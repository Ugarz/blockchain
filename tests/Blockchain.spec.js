/**
 * Global dependencies
 */
const { describe, it } = require('mocha')
const assert = require('chai').assert
const expect = require('chai').expect

const currentDate = new Date().toISOString().split('T')[0];

/**
 * Local dependencies
 */
const { Blockchain, Block } = require('../core/index')

describe('Testing the Blockchain', function () {
    it('should create a blockchain', function () {
        let django = new Blockchain()
        const blockOne = django.chain[0]
        
        assert.exists(blockOne)
        assert.equal(blockOne.index, 0)
        assert.equal(blockOne.timestamp, '2017-01-01')
    });

    it('should create a blockchain and add two blocks to it', function(){
        let django = new Blockchain()
        const blockOne = django.chain[0]
        
        django.addBlock(new Block(1, currentDate, { type: 'INCOME', amount: 10, label: 'groceries' }))
        django.addBlock(new Block(1, currentDate, { type: 'OUTCOME', amount: 30, label: 'eggHead.io Gatsby 2.0 course' }))
        
        const blockTwo = django.chain[1]
        const blockThree = django.chain[2]
        
        assert.equal(django.isChainValid(), true)
        assert.equal(blockTwo.timestamp, currentDate)
        assert.equal(blockThree.timestamp, currentDate)
    })
});