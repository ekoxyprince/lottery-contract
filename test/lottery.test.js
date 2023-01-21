//importing all neccessary library and creating a provider using ganache-cli
const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
//fetching our bytecode and Abi from our compiled contract
const {abi} = require("../compile")
const bytecode = require("../compile").evm.bytecode.object

let accounts;
let lottery;
//using mocha to run certain tests
beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts()
    lottery = await new web3.eth.Contract(abi)
    .deploy({data:bytecode})
    .send({from:accounts[0],gas:'1000000'})
})
//describe and it functions 
describe("Lottery",()=>{
    it('deploys a contract',()=>{
        assert.ok(lottery.options.address)
    })
})
